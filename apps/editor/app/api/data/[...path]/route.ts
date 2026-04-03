import { type NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import {
  createOctokit,
  getFile,
  writeFile,
  deleteFile,
  ensureBranch,
  branchForUser,
  branchExists,
  DATA_BASE,
} from '@/lib/github'
import { SpecieSchema, TaxonInfoSchema } from '@dragons/schemas'

type Params = { path: string[] }

function schemaForPath(parts: string[]) {
  return parts[parts.length - 1] === 'about.json' ? TaxonInfoSchema : SpecieSchema
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { path } = await params
  const filePath = `${DATA_BASE}/families/${path.join('/')}`
  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)

  const ref = (await branchExists(octokit, branch)) ? branch : undefined

  try {
    const result = await getFile(octokit, filePath, ref)
    return Response.json(result)
  } catch (e: any) {
    if (e.status === 404) return Response.json({ error: 'Not found' }, { status: 404 })
    throw e
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<Params> }) {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { path } = await params
  const filePath = `${DATA_BASE}/families/${path.join('/')}`
  const { content, message, sha } = await req.json()

  const parsed = schemaForPath(path).safeParse(content)
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 422 })
  }

  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)

  await ensureBranch(octokit, branch)
  const newSha = await writeFile(octokit, filePath, parsed.data, branch, message || `Update ${path.at(-1)}`, sha)

  return Response.json({ ok: true, sha: newSha })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { path } = await params
  const filePath = `${DATA_BASE}/families/${path.join('/')}`
  const { message, sha } = await req.json()

  if (!sha) return Response.json({ error: 'sha required' }, { status: 400 })

  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)

  await ensureBranch(octokit, branch)
  await deleteFile(octokit, filePath, branch, message || `Delete ${path.at(-1)}`, sha)

  return Response.json({ ok: true })
}

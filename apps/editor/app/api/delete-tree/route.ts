import { type NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { createOctokit, deleteTree, ensureBranch, branchForUser } from '@/lib/github'

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { pathPrefix } = await req.json()
  if (!pathPrefix) return Response.json({ error: 'pathPrefix required' }, { status: 400 })

  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)
  await ensureBranch(octokit, branch)

  const count = await deleteTree(octokit, pathPrefix, branch)
  return Response.json({ ok: true, deleted: count })
}

import { auth } from '@/lib/auth'
import { createOctokit, branchForUser, ensureBranch, mergeMainIntoBranch } from '@/lib/github'

export async function POST() {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)

  await ensureBranch(octokit, branch)

  try {
    const result = await mergeMainIntoBranch(octokit, branch)
    return Response.json({ ok: true, result })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: e.status ?? 500 })
  }
}

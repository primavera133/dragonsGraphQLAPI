import { auth } from '@/lib/auth'
import { createOctokit, branchForUser, branchExists, getBranchDiff } from '@/lib/github'

export async function GET() {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)

  if (!(await branchExists(octokit, branch))) {
    return Response.json({ exists: false, branch, files: [] })
  }

  const files = await getBranchDiff(octokit, branch)
  return Response.json({ exists: true, branch, files })
}

import { type NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { createOctokit, branchForUser, branchExists, createPullRequest } from '@/lib/github'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, body } = await req.json()
  if (!title) return Response.json({ error: 'title required' }, { status: 400 })

  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)

  if (!(await branchExists(octokit, branch))) {
    return Response.json({ error: 'No changes to open a PR for' }, { status: 400 })
  }

  const pr = await createPullRequest(octokit, branch, title, body ?? '')
  return Response.json({ url: pr.html_url, number: pr.number })
}

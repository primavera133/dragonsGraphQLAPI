import { auth } from '@/lib/auth'
import { createOctokit, getFile, branchForUser, branchExists, DATA_BASE } from '@/lib/github'
import { TaxonInfoEditor } from '@/components/editor/TaxonInfoEditor'
import type { TaxonInfo } from '@/types/data'

export default async function FamilyPage({
  params,
}: {
  params: Promise<{ family: string }>
}) {
  const { family } = await params
  const session = await auth()
  if (!session) return null

  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)
  const ref = (await branchExists(octokit, branch)) ? branch : undefined
  const filePath = [family, 'about.json']
  const repoPath = `${DATA_BASE}/families/${filePath.join('/')}`

  try {
    const { content, sha } = await getFile(octokit, repoPath, ref)
    return (
      <TaxonInfoEditor
        initialData={content as TaxonInfo}
        initialSha={sha}
        filePath={filePath}
        kind="Family"
        branch={branch}
      />
    )
  } catch (e: any) {
    if (e.status === 404) {
      return <p className="muted">File not found: {repoPath}</p>
    }
    throw e
  }
}

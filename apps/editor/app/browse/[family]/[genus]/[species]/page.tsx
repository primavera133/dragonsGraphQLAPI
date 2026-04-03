import { auth } from '@/lib/auth'
import { createOctokit, getFile, branchForUser, branchExists, DATA_BASE } from '@/lib/github'
import { SpeciesEditor } from '@/components/editor/SpeciesEditor'
import type { Specie } from '@/types/data'

export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ family: string; genus: string; species: string }>
}) {
  const { family, genus, species } = await params
  const session = await auth()
  if (!session) return null

  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)
  const ref = (await branchExists(octokit, branch)) ? branch : undefined
  const filePath = [family, genus, `${species}.json`]
  const repoPath = `${DATA_BASE}/families/${filePath.join('/')}`

  try {
    const { content, sha } = await getFile(octokit, repoPath, ref)
    return (
      <SpeciesEditor
        initialData={content as Specie}
        initialSha={sha}
        filePath={filePath}
      />
    )
  } catch (e: any) {
    if (e.status === 404) {
      return <p className="muted">File not found: {repoPath}</p>
    }
    throw e
  }
}

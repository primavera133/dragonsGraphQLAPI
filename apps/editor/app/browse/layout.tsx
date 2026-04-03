import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { createOctokit, getTaxonomyTree, branchForUser, branchExists } from '@/lib/github'
import { TaxonomySidebar } from '@/components/TaxonomySidebar'
import type { FamilyEntry } from '@/lib/github'

export default async function BrowseLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/')

  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)
  const ref = (await branchExists(octokit, branch)) ? branch : undefined

  let families: FamilyEntry[] = []
  try {
    families = await getTaxonomyTree(octokit, ref)
  } catch {
    // render with empty sidebar rather than crashing
  }

  return (
    <div className="page-shell">
      <TaxonomySidebar families={families} />
      <div className="content">{children}</div>
    </div>
  )
}

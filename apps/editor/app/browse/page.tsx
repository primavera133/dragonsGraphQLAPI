import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function BrowsePage() {
  const session = await auth()
  if (!session) redirect('/')

  return (
    <div className="page-shell">
      <aside className="sidebar">
        <p className="tree-section">Families</p>
        <p className="muted" style={{ padding: '0.5rem 1rem' }}>Loading…</p>
      </aside>
      <div className="content">
        <h1>Taxonomy</h1>
        <p className="muted">Select a family, genus, or species from the sidebar.</p>
      </div>
    </div>
  )
}

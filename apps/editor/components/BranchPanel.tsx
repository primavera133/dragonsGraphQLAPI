'use client'
import { useState } from 'react'

interface DiffFile {
  filename: string
  status: string
  additions: number
  deletions: number
}

interface BranchStatus {
  exists: boolean
  branch: string
  files: DiffFile[]
}

export function BranchPanel() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<BranchStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [merging, setMerging] = useState(false)
  const [mergeResult, setMergeResult] = useState<string | null>(null)
  const [pr, setPr] = useState<{ url: string; number: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function openPanel() {
    setOpen(true)
    if (status) return
    await refresh()
  }

  async function refresh() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/branch')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load branch')
      setStatus(json)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function syncWithMain() {
    setMerging(true)
    setError(null)
    setMergeResult(null)
    try {
      const res = await fetch('/api/branch/merge', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Merge failed')
      setMergeResult(json.result === 'already_up_to_date' ? 'Already up to date.' : 'Merged successfully.')
      setStatus(null)
      await refresh()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setMerging(false)
    }
  }

  async function createPr() {
    if (!title.trim()) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), body }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to create PR')
      setPr(json)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  function close() {
    setOpen(false)
  }

  const shortName = (filename: string) => filename.replace('apps/api/_data/families/', '')

  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={syncWithMain}
        disabled={merging}
        type="button"
      >
        {merging ? 'Merging…' : 'Sync with main'}
      </button>
      <button className="btn btn-secondary" onClick={openPanel} type="button">
        Review &amp; PR
      </button>

      {open && (
        <div className="panel-overlay" onClick={close}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h2 style={{ margin: 0 }}>Branch changes</h2>
              <button className="panel-close" onClick={close} type="button" aria-label="Close">✕</button>
            </div>

            {loading && <p className="muted">Loading…</p>}

            {error && (
              <div className="error-banner" style={{ marginBottom: '1rem' }}>
                <p style={{ margin: 0 }}>{error}</p>
              </div>
            )}

            {status && !loading && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <p className="muted" style={{ fontFamily: 'monospace', fontSize: '0.8rem', margin: 0, flex: 1 }}>
                    {status.branch}
                  </p>
                  <button
                    className="toolbar-btn"
                    onClick={refresh}
                    type="button"
                    aria-label="Refresh"
                  >
                    ↺
                  </button>
                </div>
                {mergeResult && (
                  <p className="muted" style={{ fontSize: '0.8rem', marginBottom: '0.75rem' }}>{mergeResult}</p>
                )}

                {!status.exists || status.files.length === 0 ? (
                  <p className="muted">No changes on this branch yet.</p>
                ) : (
                  <div className="panel-file-list">
                    {status.files.map((f) => (
                      <div key={f.filename} className="panel-file-row">
                        <span className={`panel-file-status panel-file-status--${f.status}`}>
                          {f.status[0].toUpperCase()}
                        </span>
                        <span className="panel-file-name">{shortName(f.filename)}</span>
                        <span className="panel-file-diff">
                          {f.additions > 0 && <span style={{ color: '#065f46' }}>+{f.additions}</span>}
                          {f.deletions > 0 && <span style={{ color: '#991b1b', marginLeft: '0.25rem' }}>-{f.deletions}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {status.exists && status.files.length > 0 && (
                  <div className="panel-pr-form">
                    <div className="section-title" style={{ marginBottom: '0.75rem' }}>Open pull request</div>
                    {pr ? (
                      <div style={{ fontSize: '0.875rem' }}>
                        <p style={{ margin: '0 0 0.5rem' }}>PR #{pr.number} created.</p>
                        <a href={pr.url} target="_blank" rel="noreferrer" className="btn" style={{ display: 'inline-flex' }}>
                          View on GitHub ↗
                        </a>
                      </div>
                    ) : (
                      <>
                        <div className="field">
                          <label className="label">Title</label>
                          <input
                            className="input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Update species data"
                          />
                        </div>
                        <div className="field">
                          <label className="label">Description <span className="label-hint">— optional</span></label>
                          <textarea
                            className="textarea"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Describe what you changed…"
                            rows={4}
                          />
                        </div>
                        <button
                          className="btn"
                          onClick={createPr}
                          disabled={submitting || !title.trim()}
                          type="button"
                        >
                          {submitting ? 'Creating…' : 'Create pull request'}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

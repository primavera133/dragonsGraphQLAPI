'use client'

interface Props {
  filePath: string[]
  branch: string
  changedFields: string[]
  onConfirm: () => void
  onCancel: () => void
}

export function SaveConfirmModal({ filePath, branch, changedFields, onConfirm, onCancel }: Props) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Save to branch?</h2>
        <p className="muted" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
          branch: <strong style={{ color: 'var(--fg)' }}>{branch}</strong>
        </p>
        <p className="muted" style={{ fontFamily: 'monospace', fontSize: '0.8rem', wordBreak: 'break-all' }}>
          file: {filePath.join('/')}
        </p>
        {changedFields.length > 0 ? (
          <>
            <p style={{ margin: '0.75rem 0 0.25rem', fontSize: '0.85rem' }}>Changed fields:</p>
            <ul className="modal-changed-list">
              {changedFields.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </>
        ) : (
          <p className="muted" style={{ marginTop: '0.75rem' }}>No edits detected since page load.</p>
        )}
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel} type="button">Cancel</button>
          <button className="btn" onClick={onConfirm} type="button">Save</button>
        </div>
      </div>
    </div>
  )
}

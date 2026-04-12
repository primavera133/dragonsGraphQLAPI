'use client'
import { Button } from 'react-aria-components'

interface Props {
  onSave: () => void
  onReset: () => void
  onClearAllDrafts: () => void
  saving: boolean
  savedAt: Date | null
  errorCount: number
  hasDraft: boolean
}

export function SaveBar({ onSave, onReset, onClearAllDrafts, saving, savedAt, errorCount, hasDraft }: Props) {
  return (
    <div className="save-bar">
      <div className="save-bar-status">
        {errorCount > 0 && (
          <span className="save-error-count">
            {errorCount} validation error{errorCount > 1 ? 's' : ''}
          </span>
        )}
        {hasDraft && errorCount === 0 && (
          <span className="muted">Unsaved local draft</span>
        )}
        {savedAt && !saving && errorCount === 0 && (
          <span className="muted">Saved at {savedAt.toLocaleTimeString()}</span>
        )}
      </div>
      <Button className="btn btn-secondary" onPress={onReset} isDisabled={saving} title="Reset this species to its last saved state">
        Reset
      </Button>
      <Button className="btn btn-danger" onPress={onClearAllDrafts} isDisabled={saving} title="Discard all locally saved drafts across all species">
        Clear all drafts
      </Button>
      <Button className="btn" onPress={onSave} isDisabled={saving}>
        {saving ? 'Saving…' : 'Save to branch'}
      </Button>
    </div>
  )
}

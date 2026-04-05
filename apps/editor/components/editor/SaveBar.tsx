'use client'
import { Button } from 'react-aria-components'

interface Props {
  onSave: () => void
  onReset: () => void
  saving: boolean
  savedAt: Date | null
  errorCount: number
}

export function SaveBar({ onSave, onReset, saving, savedAt, errorCount }: Props) {
  return (
    <div className="save-bar">
      <div className="save-bar-status">
        {errorCount > 0 && (
          <span className="save-error-count">
            {errorCount} validation error{errorCount > 1 ? 's' : ''}
          </span>
        )}
        {savedAt && !saving && errorCount === 0 && (
          <span className="muted">Saved at {savedAt.toLocaleTimeString()}</span>
        )}
      </div>
      <Button className="btn btn-secondary" onPress={onReset} isDisabled={saving}>
        Reset
      </Button>
      <Button className="btn" onPress={onSave} isDisabled={saving}>
        {saving ? 'Saving…' : 'Save to branch'}
      </Button>
    </div>
  )
}

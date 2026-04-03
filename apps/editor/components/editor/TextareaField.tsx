'use client'
import { TextField, Label, TextArea, FieldError } from 'react-aria-components'

interface Props {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  error?: string
  hint?: string
}

export function TextareaField({ label, value, onChange, rows = 6, error, hint }: Props) {
  return (
    <TextField
      className="field"
      isInvalid={!!error}
      value={value}
      onChange={onChange}
    >
      <Label className="label">
        {label}
        {hint && <span className="label-hint"> — {hint}</span>}
      </Label>
      <TextArea className="textarea" rows={rows} />
      {error && <FieldError className="field-error">{error}</FieldError>}
    </TextField>
  )
}

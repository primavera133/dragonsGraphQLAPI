'use client'
import { TextField, Label, Input, FieldError } from 'react-aria-components'

interface Props {
  label: string
  value: string
  onChange?: (v: string) => void
  isRequired?: boolean
  isReadOnly?: boolean
  error?: string
  placeholder?: string
}

export function StringField({ label, value, onChange, isRequired, isReadOnly, error, placeholder }: Props) {
  return (
    <TextField
      className="field"
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      isInvalid={!!error}
      value={value}
      onChange={onChange}
    >
      <Label className="label">{label}</Label>
      <Input className="input" placeholder={placeholder} readOnly={isReadOnly} />
      {error && <FieldError className="field-error">{error}</FieldError>}
    </TextField>
  )
}

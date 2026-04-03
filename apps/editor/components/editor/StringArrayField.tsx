'use client'
import { Button } from 'react-aria-components'

interface Props {
  label: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function StringArrayField({ label, values, onChange, placeholder }: Props) {
  function update(i: number, v: string) {
    const next = [...values]
    next[i] = v
    onChange(next)
  }

  function remove(i: number) {
    onChange(values.filter((_, idx) => idx !== i))
  }

  return (
    <div className="field">
      <div className="label">{label}</div>
      <div className="array-list">
        {values.map((v, i) => (
          <div key={i} className="array-row">
            <input
              className="input"
              value={v}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
            />
            <Button className="btn btn-secondary" onPress={() => remove(i)} aria-label="Remove">
              ×
            </Button>
          </div>
        ))}
      </div>
      <Button className="btn btn-secondary" onPress={() => onChange([...values, ''])}>
        + Add
      </Button>
    </div>
  )
}

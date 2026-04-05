'use client'
import { Button } from 'react-aria-components'

interface Pair {
  [key: string]: string
}

interface Props {
  label: string
  values: Pair[]
  onChange: (values: Pair[]) => void
  fieldA: string
  fieldB: string
  placeholderA?: string
  placeholderB?: string
}

export function PairsField({ label, values, onChange, fieldA, fieldB, placeholderA, placeholderB }: Props) {
  function update(i: number, field: string, v: string) {
    const next = values.map((item, idx) => (idx === i ? { ...item, [field]: v } : item))
    onChange(next)
  }

  function remove(i: number) {
    onChange(values.filter((_, idx) => idx !== i))
  }

  function add() {
    onChange([...values, { [fieldA]: '', [fieldB]: '' }])
  }

  return (
    <div className="field">
      <div className="label">{label}</div>
      <div className="array-list">
        {values.map((item, i) => (
          <div key={i} className="array-row">
            <input
              className="input"
              value={item[fieldA] ?? ''}
              onChange={(e) => update(i, fieldA, e.target.value)}
              placeholder={placeholderA ?? fieldA}
            />
            <input
              className="input"
              value={item[fieldB] ?? ''}
              onChange={(e) => update(i, fieldB, e.target.value)}
              placeholder={placeholderB ?? fieldB}
            />
            <Button className="btn btn-secondary" onPress={() => remove(i)} aria-label="Remove">
              ×
            </Button>
          </div>
        ))}
      </div>
      <Button className="btn btn-secondary" onPress={add}>
        + Add
      </Button>
    </div>
  )
}

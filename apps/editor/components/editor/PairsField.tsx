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
  showPreview?: boolean
}

export function PairsField({ label, values, onChange, fieldA, fieldB, placeholderA, placeholderB, showPreview }: Props) {
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
            {showPreview && item[fieldB] && (
              <a
                href={item[fieldB]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Preview link"
                title={item[fieldB]}
                style={{ display: 'flex', alignItems: 'center', color: 'inherit', opacity: 0.6 }}
                onMouseOver={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
                onMouseOut={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.6')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
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

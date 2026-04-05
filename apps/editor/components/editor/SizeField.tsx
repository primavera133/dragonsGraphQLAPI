'use client'
import type { Size } from '@/types/data'

interface Props {
  value: Size
  onChange: (v: Size) => void
}

export function SizeField({ value, onChange }: Props) {
  return (
    <div className="field">
      <div className="label">Size</div>
      <div className="row">
        <div className="field">
          <label className="label">Length</label>
          <input
            className="input"
            value={value.length ?? ''}
            onChange={(e) => onChange({ ...value, length: e.target.value })}
            placeholder="e.g. 69–70 mm"
          />
        </div>
        <div className="field">
          <label className="label">Wingspan</label>
          <input
            className="input"
            value={value.wingspan ?? ''}
            onChange={(e) => onChange({ ...value, wingspan: e.target.value })}
            placeholder="e.g. 88–95 mm"
          />
        </div>
      </div>
    </div>
  )
}

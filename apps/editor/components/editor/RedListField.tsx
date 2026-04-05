'use client'
import type { RedList } from '@/types/data'

const FIELDS: { key: keyof RedList; label: string }[] = [
  { key: 'habitats_directive', label: 'Habitats Directive' },
  { key: 'red_list_EU27', label: 'Red List EU27' },
  { key: 'red_list_europe', label: 'Red List Europe' },
  { key: 'red_list_mediterranean', label: 'Red List Mediterranean' },
  { key: 'EU27_endemic', label: 'EU27 Endemic' },
  { key: 'red_list_europe_endemic', label: 'Red List Europe Endemic' },
  { key: 'trend_europe', label: 'Trend Europe' },
]

const EMPTY: RedList = {
  habitats_directive: '',
  red_list_EU27: '',
  red_list_europe: '',
  red_list_mediterranean: '',
  EU27_endemic: '',
  red_list_europe_endemic: '',
  trend_europe: '',
}

interface Props {
  value: RedList | undefined
  onChange: (v: RedList) => void
}

export function RedListField({ value, onChange }: Props) {
  const data = value ?? EMPTY

  function update(key: keyof RedList, v: string) {
    onChange({ ...data, [key]: v })
  }

  return (
    <div className="field">
      <div className="label">Red List</div>
      <div className="grid-2">
        {FIELDS.map(({ key, label }) => (
          <div key={key} className="field">
            <label className="label">{label}</label>
            <input
              className="input"
              value={data[key]}
              onChange={(e) => update(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

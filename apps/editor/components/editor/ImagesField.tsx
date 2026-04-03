'use client'
import { useState } from 'react'
import { Button } from 'react-aria-components'
import type { Images, ImageData } from '@/types/data'

const EMPTY_IMAGE: ImageData = {
  public_id: '',
  caption: '',
  license: '',
  lic_url: '',
  by: '',
  url: '',
}

interface Props {
  value: Images | undefined
  onChange: (v: Images) => void
}

export function ImagesField({ value, onChange }: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const data = { cloud_name: value?.cloud_name ?? 'dragonflies', all: value?.all ?? [] }

  function toggleExpand(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  function updateImage(i: number, field: keyof ImageData, v: string) {
    const next = data.all.map((img, idx) => (idx === i ? { ...img, [field]: v } : img))
    onChange({ ...data, all: next })
  }

  function removeImage(i: number) {
    onChange({ ...data, all: data.all.filter((_, idx) => idx !== i) })
    setExpanded((prev) => {
      const next = new Set(prev)
      next.delete(i)
      return next
    })
  }

  function addImage() {
    const next = [...data.all, { ...EMPTY_IMAGE }]
    onChange({ ...data, all: next })
    setExpanded((prev) => new Set([...prev, next.length - 1]))
  }

  return (
    <div className="field">
      <div className="label">Images</div>
      <div className="field">
        <label className="label">Cloud name</label>
        <input
          className="input"
          value={data.cloud_name}
          onChange={(e) => onChange({ ...data, cloud_name: e.target.value })}
        />
      </div>
      <div className="array-list">
        {data.all.map((img, i) => (
          <div key={i} className="image-record">
            <div className="image-record-header">
              <button className="tree-toggle" onClick={() => toggleExpand(i)}>
                {expanded.has(i) ? '▲' : '▼'}
              </button>
              <span className="muted">{img.public_id || `Image ${i + 1}`}</span>
              <Button className="btn btn-secondary" onPress={() => removeImage(i)} aria-label="Remove image">
                ×
              </Button>
            </div>
            {expanded.has(i) && (
              <div className="image-record-fields">
                {(
                  [
                    ['public_id', 'Public ID'],
                    ['caption', 'Caption'],
                    ['license', 'License'],
                    ['lic_url', 'License URL'],
                    ['by', 'Photographer'],
                    ['url', 'Source URL'],
                  ] as [keyof ImageData, string][]
                ).map(([field, label]) => (
                  <div key={field} className="field">
                    <label className="label">{label}</label>
                    <input
                      className="input"
                      value={img[field] ?? ''}
                      onChange={(e) => updateImage(i, field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Button className="btn btn-secondary" onPress={addImage}>
        + Add image
      </Button>
    </div>
  )
}

'use client'
import { useState } from 'react'
// @ts-ignore — CJS package with manual .d.ts
import { SpecieSchema } from '@dragons/schemas'
import type { Specie } from '@/types/data'
import { StringField } from './StringField'
import { TextareaField } from './TextareaField'
import { MarkdownEditor } from './MarkdownEditor'
import { StringArrayField } from './StringArrayField'
import { PairsField } from './PairsField'
import { SizeField } from './SizeField'
import { RedListField } from './RedListField'
import { ImagesField } from './ImagesField'
import { SaveBar } from './SaveBar'

interface Props {
  initialData: Specie
  initialSha: string
  filePath: string[]
}

export function SpeciesEditor({ initialData, initialSha, filePath }: Props) {
  const [data, setData] = useState<Specie>(initialData)
  const [sha, setSha] = useState(initialSha)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [mainData, setMainData] = useState<Specie | null>(null)
  const [loadingMain, setLoadingMain] = useState(false)

  async function loadMain() {
    if (mainData || loadingMain) return
    setLoadingMain(true)
    try {
      const res = await fetch(`/api/data/${filePath.join('/')}?ref=main`)
      if (res.ok) {
        const json = await res.json()
        setMainData(json.content as Specie)
      }
    } finally {
      setLoadingMain(false)
    }
  }

  function set<K extends keyof Specie>(key: K, value: Specie[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function save() {
    const result = SpecieSchema.safeParse(data)
    if (!result.success) {
      setErrors(result.error.issues.map((i: any) => `${(i.path as PropertyKey[]).join('.') || 'root'}: ${i.message}`))
      return
    }
    setErrors([])
    setSaving(true)
    try {
      const res = await fetch(`/api/data/${filePath.join('/')}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: result.data, sha }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Save failed')
      if (json.sha) setSha(json.sha)
      setSavedAt(new Date())
    } catch (e: any) {
      setErrors([e.message])
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="muted" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Species</div>
            <h1>{data.scientific_name || '(untitled)'}</h1>
          </div>
          <button
            className="btn btn-secondary"
            onClick={loadMain}
            disabled={loadingMain || !!mainData}
            style={{ marginTop: '0.25rem', flexShrink: 0 }}
          >
            {loadingMain ? 'Loading…' : mainData ? 'Diff loaded' : 'Load diff'}
          </button>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="error-banner">
          {errors.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}

      <div className="field-section">
        <div className="section-title">Identification</div>
        <StringField label="ID" value={data.items_id} isReadOnly />
        <StringField
          label="Scientific name"
          value={data.scientific_name}
          onChange={(v) => set('scientific_name', v)}
          isRequired
        />
        <StringField
          label="Author citation"
          value={data.author_citation ?? ''}
          onChange={(v) => set('author_citation', v)}
        />
        <StringArrayField
          label="Local names"
          values={data.local_names ?? []}
          onChange={(v) => set('local_names', v)}
        />
      </div>

      <div className="field-section">
        <div className="section-title">Description</div>
        <MarkdownEditor
          label="Description"
          value={data.description ?? ''}
          onChange={(v) => set('description', v)}
          original={mainData ? (mainData.description ?? '') : undefined}
        />
        <MarkdownEditor
          label="Behaviour"
          value={data.behaviour ?? ''}
          onChange={(v) => set('behaviour', v)}
          original={mainData ? (mainData.behaviour ?? '') : undefined}
        />
      </div>

      <div className="field-section">
        <div className="section-title">Ecology</div>
        <SizeField value={data.size ?? {}} onChange={(v) => set('size', v)} />
        <StringField
          label="Flight period"
          value={data.flight_period ?? ''}
          onChange={(v) => set('flight_period', v)}
          placeholder="e.g. From the end of May to August"
        />
        <MarkdownEditor
          label="Habitat"
          value={data.habitat ?? ''}
          onChange={(v) => set('habitat', v)}
          original={mainData ? (mainData.habitat ?? '') : undefined}
        />
        <MarkdownEditor
          label="Distribution"
          value={data.distribution ?? ''}
          onChange={(v) => set('distribution', v)}
          original={mainData ? (mainData.distribution ?? '') : undefined}
        />
        <StringArrayField
          label="Similar species"
          values={data.similar_species ?? []}
          onChange={(v) => set('similar_species', v)}
        />
      </div>

      <div className="field-section">
        <div className="section-title">Conservation</div>
        <RedListField value={data.red_list} onChange={(v) => set('red_list', v)} />
      </div>

      <div className="field-section">
        <div className="section-title">Media</div>
        <ImagesField value={data.images} onChange={(v) => set('images', v)} />
      </div>

      <div className="field-section">
        <div className="section-title">References</div>
        <StringArrayField
          label="Sources"
          values={data.sources ?? []}
          onChange={(v) => set('sources', v)}
          placeholder="[Author, Year](url)"
        />
        <PairsField
          label="Links"
          values={(data.links ?? []) as { label: string; link: string }[]}
          onChange={(v) => set('links', v as unknown as Specie['links'])}
          fieldA="label"
          fieldB="link"
          placeholderA="Label"
          placeholderB="URL"
        />
        <PairsField
          label="Meta"
          values={(data.meta ?? []) as { label: string; value: string }[]}
          onChange={(v) => set('meta', v as unknown as Specie['meta'])}
          fieldA="label"
          fieldB="value"
          placeholderA="Key"
          placeholderB="Value"
        />
      </div>

      <SaveBar onSave={save} saving={saving} savedAt={savedAt} errorCount={errors.length} />
    </div>
  )
}

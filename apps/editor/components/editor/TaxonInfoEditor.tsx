'use client'
import { useState } from 'react'
// @ts-ignore — CJS package with manual .d.ts
import { TaxonInfoSchema } from '@dragons/schemas'
import type { TaxonInfo } from '@/types/data'
import { StringField } from './StringField'
import { MarkdownEditor } from './MarkdownEditor'
import { StringArrayField } from './StringArrayField'
import { PairsField } from './PairsField'
import { SaveBar } from './SaveBar'

interface Props {
  initialData: TaxonInfo
  initialSha: string
  filePath: string[]
  kind: 'Family' | 'Genus'
}

export function TaxonInfoEditor({ initialData, initialSha, filePath, kind }: Props) {
  const [data, setData] = useState<TaxonInfo>(initialData)
  const [sha, setSha] = useState(initialSha)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  function set<K extends keyof TaxonInfo>(key: K, value: TaxonInfo[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function save() {
    const result = TaxonInfoSchema.safeParse(data)
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
        <div>
          <div className="muted" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>{kind}</div>
          <h1>{data.title}</h1>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="error-banner">
          {errors.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}

      <div className="field-section">
        <StringField label="Title" value={data.title} onChange={(v) => set('title', v)} isRequired />
        <StringField label="Author citation" value={data.author_citation} onChange={(v) => set('author_citation', v)} isRequired />
        <MarkdownEditor label="Description" value={data.description} onChange={(v) => set('description', v)} />
      </div>

      <div className="field-section">
        <div className="section-title">References</div>
        <StringArrayField label="Sources" values={data.sources ?? []} onChange={(v) => set('sources', v)} placeholder="[Author, Year](url)" />
        <PairsField
          label="Links"
          values={(data.links ?? []) as { label: string; link: string }[]}
          onChange={(v) => set('links', v as unknown as TaxonInfo['links'])}
          fieldA="label"
          fieldB="link"
          placeholderA="Label"
          placeholderB="URL"
        />
        <PairsField
          label="Meta"
          values={(data.meta ?? []) as { label: string; value: string }[]}
          onChange={(v) => set('meta', v as unknown as TaxonInfo['meta'])}
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

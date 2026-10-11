'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// @ts-ignore — CJS package with manual .d.ts
import { TaxonInfoSchema } from '@dragons/schemas'
import { DATA_BASE } from '@/lib/github'
import type { TaxonInfo } from '@/types/data'
import { StringField } from './StringField'
import { MarkdownEditor } from './MarkdownEditor'
import { StringArrayField } from './StringArrayField'
import { PairsField } from './PairsField'
import { SaveBar } from './SaveBar'
import { SaveConfirmModal } from './SaveConfirmModal'

interface Props {
  initialData: TaxonInfo
  initialSha: string
  filePath: string[]
  kind: 'Family' | 'Genus'
  branch: string
}

const DRAFT_PREFIX = 'dragons-draft:'

function draftKey(filePath: string[]) {
  return `${DRAFT_PREFIX}${filePath.join('/')}`
}

export function TaxonInfoEditor({ initialData, initialSha, filePath, kind, branch }: Props) {
  const router = useRouter()
  const [data, setData] = useState<TaxonInfo>(initialData)
  const [sha, setSha] = useState(initialSha)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [resetCount, setResetCount] = useState(0)
  const [mainData, setMainData] = useState<TaxonInfo | null>(null)
  const [loadingMain, setLoadingMain] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasDraft, setHasDraft] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey(filePath))
      if (saved) {
        setData(JSON.parse(saved))
        setHasDraft(true)
      }
    } catch {}
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      if (JSON.stringify(data) === JSON.stringify(initialData)) {
        localStorage.removeItem(draftKey(filePath))
        setHasDraft(false)
      } else {
        localStorage.setItem(draftKey(filePath), JSON.stringify(data))
        setHasDraft(true)
      }
    } catch {}
  }, [data, mounted])

  async function deleteTaxon() {
    // filePath: ['familyName', 'about.json'] for family
    //           ['familyName', 'genusName', 'about.json'] for genus
    const isFamily = kind === 'Family'
    const label = isFamily ? `family ${filePath[0]}` : `genus ${filePath[1]}`
    if (!confirm(`Delete ${label} and all its contents? This cannot be undone.`)) return

    const pathPrefix = isFamily
      ? `${DATA_BASE}/families/${filePath[0]}/`
      : `${DATA_BASE}/families/${filePath[0]}/${filePath[1]}/`

    const res = await fetch('/api/delete-tree', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pathPrefix }),
    })
    if (!res.ok) {
      const json = await res.json()
      alert(json.error || 'Delete failed')
      return
    }
    router.push(isFamily ? '/browse' : `/browse/${filePath[0]}`)
    router.refresh()
  }

  async function loadMain() {
    if (mainData || loadingMain) return
    setLoadingMain(true)
    try {
      const res = await fetch(`/api/data/${filePath.join('/')}?ref=main`)
      if (res.ok) {
        const json = await res.json()
        setMainData(json.content as TaxonInfo)
      }
    } finally {
      setLoadingMain(false)
    }
  }

  function set<K extends keyof TaxonInfo>(key: K, value: TaxonInfo[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function reset() {
    setData(initialData)
    setErrors([])
    setResetCount((c) => c + 1)
    setHasDraft(false)
    try { localStorage.removeItem(draftKey(filePath)) } catch {}
  }

  function clearAllDrafts() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(DRAFT_PREFIX))
        .forEach((k) => localStorage.removeItem(k))
    } catch {}
    setData(initialData)
    setErrors([])
    setResetCount((c) => c + 1)
    setHasDraft(false)
  }

  function changedFields() {
    return (Object.keys(data) as (keyof TaxonInfo)[]).filter(
      (k) => JSON.stringify(data[k]) !== JSON.stringify(initialData[k]),
    )
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
      try { localStorage.removeItem(draftKey(filePath)) } catch {}
      setHasDraft(false)
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
            <div className="muted" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>{kind}</div>
            <h1>{data.title}</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }}>
            <button
              className="btn btn-secondary"
              onClick={loadMain}
              disabled={loadingMain || !!mainData}
            >
              {loadingMain ? 'Loading…' : mainData ? 'Diff loaded' : 'Load diff'}
            </button>
            <button className="btn btn-danger" onClick={deleteTaxon}>
              Delete
            </button>
          </div>
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
        <MarkdownEditor key={`description-${resetCount}`} label="Description" value={data.description} onChange={(v) => set('description', v)} original={mainData ? mainData.description : undefined} />
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
          showPreview
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

      <SaveBar
        onSave={() => setConfirming(true)}
        onReset={reset}
        onClearAllDrafts={clearAllDrafts}
        saving={saving}
        savedAt={savedAt}
        errorCount={errors.length}
        hasDraft={hasDraft}
      />
      {confirming && (
        <SaveConfirmModal
          filePath={filePath}
          branch={branch}
          changedFields={changedFields()}
          onConfirm={() => { setConfirming(false); save() }}
          onCancel={() => setConfirming(false)}
        />
      )}
    </div>
  )
}

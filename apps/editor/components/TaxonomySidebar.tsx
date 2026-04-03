'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { FamilyEntry } from '@/lib/github'

type AddingState =
  | { type: 'family' }
  | { type: 'genus'; family: string }
  | { type: 'species'; family: string; genus: string }
  | null

interface AddFormProps {
  inputRef: React.RefObject<HTMLInputElement | null>
  value: string
  onChange: (v: string) => void
  placeholder: string
  onSubmit: () => void
  onCancel: () => void
  submitting: boolean
}

function AddForm({ inputRef, value, onChange, placeholder, onSubmit, onCancel, submitting }: AddFormProps) {
  return (
    <div className="tree-add-form">
      <input
        ref={inputRef}
        className="tree-add-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit()
          if (e.key === 'Escape') onCancel()
        }}
        disabled={submitting}
      />
      <button className="tree-add-confirm" onClick={onSubmit} disabled={submitting || !value.trim()} type="button">
        {submitting ? '…' : '✓'}
      </button>
      <button className="tree-add-cancel" onClick={onCancel} disabled={submitting} type="button">
        ✕
      </button>
    </div>
  )
}

export function TaxonomySidebar({ families }: { families: FamilyEntry[] }) {
  const pathname = usePathname()
  const router = useRouter()

  // e.g. /browse/aeshnidae/aeshna/aeshna-cyanea → ['aeshnidae', 'aeshna', 'aeshna-cyanea']
  const pathParts = pathname.replace(/^\/browse\/?/, '').split('/').filter(Boolean)

  const [openFamilies, setOpenFamilies] = useState<Set<string>>(
    () => pathParts[0] ? new Set([pathParts[0]]) : new Set(),
  )
  const [openGenera, setOpenGenera] = useState<Set<string>>(
    () => pathParts[0] && pathParts[1] ? new Set([`${pathParts[0]}/${pathParts[1]}`]) : new Set(),
  )
  const [adding, setAdding] = useState<AddingState>(null)
  const [inputValue, setInputValue] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function toggleFamily(name: string) {
    setOpenFamilies((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  function toggleGenus(key: string) {
    setOpenGenera((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  function startAdding(state: AddingState) {
    setAdding(state)
    setInputValue('')
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function cancelAdding() {
    setAdding(null)
    setInputValue('')
  }

  async function submitAdd() {
    if (!adding || !inputValue.trim()) return
    const slug = inputValue.trim().toLowerCase().replace(/\s+/g, '-')
    setSubmitting(true)
    try {
      const body =
        adding.type === 'family'
          ? { type: 'family', name: slug }
          : adding.type === 'genus'
            ? { type: 'genus', family: adding.family, name: slug }
            : { type: 'species', family: adding.family, genus: adding.genus, slug }

      const res = await fetch('/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed')
      cancelAdding()
      router.push(json.redirect)
      router.refresh()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const formProps = {
    inputRef,
    value: inputValue,
    onChange: setInputValue,
    onSubmit: submitAdd,
    onCancel: cancelAdding,
    submitting,
  }

  return (
    <aside className="sidebar">
      <div className="tree-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Families
        <button
          className="tree-add-btn"
          onClick={() => startAdding({ type: 'family' })}
          aria-label="Add family"
          type="button"
        >
          +
        </button>
      </div>

      {adding?.type === 'family' && <AddForm {...formProps} placeholder="family-name" />}

      {families.map((family) => {
        const familyPath = `/browse/${family.name}`
        const familyOpen = openFamilies.has(family.name)

        return (
          <div key={family.name}>
            <div className="tree-row">
              <Link
                href={familyPath}
                className={`tree-item${pathname === familyPath ? ' tree-item-active' : ''}`}
              >
                {family.name}
              </Link>
              <button
                className="tree-add-btn"
                onClick={() => {
                  startAdding({ type: 'genus', family: family.name })
                  if (!familyOpen) toggleFamily(family.name)
                }}
                aria-label={`Add genus to ${family.name}`}
                type="button"
              >
                +
              </button>
              <button
                className="tree-toggle"
                onClick={() => toggleFamily(family.name)}
                aria-label={familyOpen ? 'Collapse' : 'Expand'}
              >
                {familyOpen ? '▲' : '▼'}
              </button>
            </div>

            {familyOpen && (
              <>
                {adding?.type === 'genus' && adding.family === family.name && (
                  <div style={{ paddingLeft: '2rem' }}>
                    <AddForm {...formProps} placeholder="genus-name" />
                  </div>
                )}
                {family.genera.map((genus) => {
                  const genusKey = `${family.name}/${genus.name}`
                  const genusPath = `/browse/${family.name}/${genus.name}`
                  const genusOpen = openGenera.has(genusKey)

                  return (
                    <div key={genus.name}>
                      <div className="tree-row">
                        <Link
                          href={genusPath}
                          className={`tree-item tree-item-indent${pathname === genusPath ? ' tree-item-active' : ''}`}
                        >
                          {genus.name}
                        </Link>
                        <button
                          className="tree-add-btn"
                          onClick={() => {
                            startAdding({ type: 'species', family: family.name, genus: genus.name })
                            if (!genusOpen) toggleGenus(genusKey)
                          }}
                          aria-label={`Add species to ${genus.name}`}
                          type="button"
                        >
                          +
                        </button>
                        <button
                          className="tree-toggle"
                          onClick={() => toggleGenus(genusKey)}
                          aria-label={genusOpen ? 'Collapse' : 'Expand'}
                        >
                          {genusOpen ? '▲' : '▼'}
                        </button>
                      </div>

                      {genusOpen && (
                        <>
                          {adding?.type === 'species' &&
                            adding.family === family.name &&
                            adding.genus === genus.name && (
                              <div style={{ paddingLeft: '3rem' }}>
                                <AddForm {...formProps} placeholder="species-slug" />
                              </div>
                            )}
                          {genus.species.map((sp) => {
                            const spPath = `/browse/${family.name}/${genus.name}/${sp.slug}`
                            return (
                              <Link
                                key={sp.slug}
                                href={spPath}
                                className={`tree-item tree-item-indent2${pathname === spPath ? ' tree-item-active' : ''}`}
                              >
                                {sp.slug.replace(/-/g, '\u00a0')}
                              </Link>
                            )
                          })}
                        </>
                      )}
                    </div>
                  )
                })}
              </>
            )}
          </div>
        )
      })}
    </aside>
  )
}

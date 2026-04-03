'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FamilyEntry } from '@/lib/github'

export function TaxonomySidebar({ families }: { families: FamilyEntry[] }) {
  const pathname = usePathname()
  const [openFamilies, setOpenFamilies] = useState<Set<string>>(new Set())
  const [openGenera, setOpenGenera] = useState<Set<string>>(new Set())

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

  return (
    <aside className="sidebar">
      <div className="tree-section">Families</div>
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
                className="tree-toggle"
                onClick={() => toggleFamily(family.name)}
                aria-label={familyOpen ? 'Collapse' : 'Expand'}
              >
                {familyOpen ? '▲' : '▼'}
              </button>
            </div>

            {familyOpen &&
              family.genera.map((genus) => {
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
                      {genus.species.length > 0 && (
                        <button
                          className="tree-toggle"
                          onClick={() => toggleGenus(genusKey)}
                          aria-label={genusOpen ? 'Collapse' : 'Expand'}
                        >
                          {genusOpen ? '▲' : '▼'}
                        </button>
                      )}
                    </div>

                    {genusOpen &&
                      genus.species.map((sp) => {
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
                  </div>
                )
              })}
          </div>
        )
      })}
    </aside>
  )
}

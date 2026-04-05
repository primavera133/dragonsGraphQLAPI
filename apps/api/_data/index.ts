import fs from 'fs'
import path from 'path'
import type { SpeciesData } from '../_types'

const familiesDir = path.join(__dirname, 'families')
const result: SpeciesData = {}

for (const familyName of fs.readdirSync(familiesDir).sort()) {
  const familyPath = path.join(familiesDir, familyName)
  if (!fs.statSync(familyPath).isDirectory()) continue

  const genera: Record<string, unknown[]> = {}
  for (const genusName of fs.readdirSync(familyPath).sort()) {
    const genusPath = path.join(familyPath, genusName)
    if (!fs.statSync(genusPath).isDirectory()) continue

    const species: unknown[] = []
    for (const file of fs.readdirSync(genusPath).sort()) {
      if (file === 'about.json' || !file.endsWith('.json')) continue
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      species.push(require(path.join(genusPath, file)))
    }
    if (species.length > 0) {
      genera[genusName] = species
    }
  }

  if (Object.keys(genera).length > 0) {
    result[familyName] = genera as Record<string, never[]>
  }
}

export = result

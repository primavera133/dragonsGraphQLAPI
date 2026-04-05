import fs from 'fs'
import path from 'path'
import type { TaxonInfo } from '../_types'

const familiesDir = path.join(__dirname, 'families')
const result: Record<string, TaxonInfo> = {}

for (const familyName of fs.readdirSync(familiesDir).sort()) {
  const familyPath = path.join(familiesDir, familyName)
  if (!fs.statSync(familyPath).isDirectory()) continue

  for (const genusName of fs.readdirSync(familyPath).sort()) {
    const aboutPath = path.join(familyPath, genusName, 'about.json')
    if (fs.existsSync(aboutPath)) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      result[genusName] = require(aboutPath) as TaxonInfo
    }
  }
}

export = result

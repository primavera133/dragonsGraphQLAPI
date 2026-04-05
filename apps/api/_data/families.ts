import fs from 'fs'
import path from 'path'
import type { TaxonInfo } from '../_types'

const familiesDir = path.join(__dirname, 'families')
const result: Record<string, TaxonInfo> = {}

for (const familyName of fs.readdirSync(familiesDir).sort()) {
  const aboutPath = path.join(familiesDir, familyName, 'about.json')
  if (fs.existsSync(aboutPath)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    result[familyName] = require(aboutPath) as TaxonInfo
  }
}

export = result

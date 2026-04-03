const fs = require('fs')
const path = require('path')

const familiesDir = path.join(__dirname, 'families')
const result = {}

for (const familyName of fs.readdirSync(familiesDir).sort()) {
  const familyPath = path.join(familiesDir, familyName)
  if (!fs.statSync(familyPath).isDirectory()) continue

  const genera = {}
  for (const genusName of fs.readdirSync(familyPath).sort()) {
    const genusPath = path.join(familyPath, genusName)
    if (!fs.statSync(genusPath).isDirectory()) continue

    const species = []
    for (const file of fs.readdirSync(genusPath).sort()) {
      if (file === 'about.json' || !file.endsWith('.json')) continue
      species.push(require(path.join(genusPath, file)))
    }
    if (species.length > 0) {
      genera[genusName] = species
    }
  }

  if (Object.keys(genera).length > 0) {
    result[familyName] = genera
  }
}

module.exports = result

const fs = require('fs')
const path = require('path')

const familiesDir = path.join(__dirname, 'families')
const result = {}

for (const familyName of fs.readdirSync(familiesDir).sort()) {
  const familyPath = path.join(familiesDir, familyName)
  if (!fs.statSync(familyPath).isDirectory()) continue

  for (const genusName of fs.readdirSync(familyPath).sort()) {
    const aboutPath = path.join(familyPath, genusName, 'about.json')
    if (fs.existsSync(aboutPath)) {
      result[genusName] = require(aboutPath)
    }
  }
}

module.exports = result

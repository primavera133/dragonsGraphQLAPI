const fs = require('fs')
const path = require('path')

const familiesDir = path.join(__dirname, 'families')
const result = {}

for (const familyName of fs.readdirSync(familiesDir).sort()) {
  const aboutPath = path.join(familiesDir, familyName, 'about.json')
  if (fs.existsSync(aboutPath)) {
    result[familyName] = require(aboutPath)
  }
}

module.exports = result

const allFamilies = species => {
  return Object.keys(species).map(family_name => ({ family_name }))
}

module.exports = allFamilies

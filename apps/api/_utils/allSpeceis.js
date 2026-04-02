const allSpecies = species => {
  const families = Object.values(species)
  return families.reduce((acc, family) => {
    const genera = Object.values(family)
    return acc.concat(genera.reduce((acc, genera) => acc.concat(genera), []))
  }, [])
}

module.exports = allSpecies

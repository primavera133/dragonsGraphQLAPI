const allSpecies = species => {
    const families = Object.values(species)
    return families.reduce((acc, family) => {
        const generas = Object.values(family)
        return acc.concat(generas.reduce((acc, genera) => acc.concat(genera), []))
    }, [])
}

module.exports = allSpecies
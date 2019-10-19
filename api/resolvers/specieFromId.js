const species = require('../data/index.js')
const allSpecies = require('../utils/allSpeceis')

const specieFromIdResolver = (parent, { items_id }) => {
    const specie = allSpecies(species).find(
        specie => specie.items_id === items_id
    )
    if (!specie) return new ApolloError(`Specie not found: ${items_id}`)
    return specie
}

module.exports = specieFromIdResolver

const species = require('../data/index.js')
const allSpecies = require('../utils/allSpeceis')

const speciesResolver = () => {
    return allSpecies(species)
}

module.exports = speciesResolver
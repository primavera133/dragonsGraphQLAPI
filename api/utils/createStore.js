const species = require('../data/index.js')
const allSpecies = require('./allSpeceis')

module.exports.createStore = () => ({
  species,
  allSpecies: allSpecies(species)
})

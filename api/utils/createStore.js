const species = require('../data/index.js')
const allSpecies = require('./allSpeceis')
const allFamilies = require('./allFamilies')

module.exports.createStore = () => ({
  species,
  allSpecies: allSpecies(species),
  allFamilies: allFamilies(species)
})

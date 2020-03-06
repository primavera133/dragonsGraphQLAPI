const species = require('../data/index.js')
const allSpecies = require('./allSpeceis')
const allFamilies = require('./allFamilies')
const allGenera = require('./allGenera')

module.exports.createStore = () => ({
  species,
  allSpecies: allSpecies(species),
  allFamilies: allFamilies(species),
  allGenera: allGenera(species)
})

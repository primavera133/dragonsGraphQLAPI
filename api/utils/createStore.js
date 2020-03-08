const species = require('../data/index.js')
const allSpecies = require('./allSpeceis')
const allFamilies = require('./allFamilies')
const allGenera = require('./allGenera')
const genera = require('../data/genera')

module.exports.createSpeciesStore = () => ({
  species,
  allSpecies: allSpecies(species),
  allFamilies: allFamilies(species),
  allGenera: allGenera(species)
})

module.exports.createGenusStore = () => ({
  genera
})

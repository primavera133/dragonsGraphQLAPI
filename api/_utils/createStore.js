const species = require('../_data/index.js')
const allSpecies = require('./allSpeceis')
const allFamilies = require('./allFamilies')
const allGenera = require('./allGenera')
const genera = require('../_data/genera')
const families = require('../_data/families')

module.exports.createSpeciesStore = () => ({
  species,
  allSpecies: allSpecies(species),
  allFamilies: allFamilies(species),
  allGenera: allGenera(species)
})

module.exports.createAboutStore = () => ({
  genera,
  families
})

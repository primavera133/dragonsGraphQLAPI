const species = require('../_data/index.js')
const allSpecies = require('./allSpeceis')
const allFamilies = require('./allFamilies')
const allGenera = require('./allGenera')
const genera = require('../_data/genera')
const families = require('../_data/families')
const { z } = require('zod')
const { SpecieSchema, TaxonInfoSchema } = require('../_schemas')

module.exports.createSpeciesStore = () => {
  const allSpeciesArr = allSpecies(species)
  z.array(SpecieSchema).parse(allSpeciesArr)

  return {
    species,
    allSpecies: allSpeciesArr,
    allFamilies: allFamilies(species),
    allGenera: allGenera(species),
  }
}

module.exports.createAboutStore = () => {
  Object.values(families).forEach(family => TaxonInfoSchema.parse(family))
  Object.values(genera).forEach(genus => TaxonInfoSchema.parse(genus))

  return { genera, families }
}

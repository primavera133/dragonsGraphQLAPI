const { ApolloError } = require('apollo-server-micro')

const species = require('../data/index.js')
const allSpecies = require('../utils/allSpeceis')

const specieFromScientificNameResolver = (parent, { scientific_name }) => {
  scientific_name = scientific_name.toLowerCase()
  const specie = allSpecies(species).find(
    specie => specie.scientific_name.toLowerCase() === scientific_name
  )
  if (!specie) {
    return new ApolloError(`Specie not found: ${scientific_name}`)
  }
  return specie
}

module.exports = specieFromScientificNameResolver

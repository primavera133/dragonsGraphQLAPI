const { ApolloError } = require('apollo-server-micro')

const species = require('../data/index.js')
console.log(1111, species)

const generaFromNameResolver = (parent, { name }) => {
  const allGeneras = Object.values(species).reduce((acc, family) => {
    Object.keys(family).forEach(key => (acc[key] = family[key]))
    return acc
  }, {})
  const genera = allGeneras[name.toLowerCase()]
  if (!genera) return new ApolloError(`Genera not found: ${name}`)
  return genera
}

module.exports = generaFromNameResolver

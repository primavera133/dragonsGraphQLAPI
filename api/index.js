const { ApolloServer, gql, ApolloError } = require('apollo-server-micro')
const species = require('./data/index.js')
const allSpecies = require('./utils/allSpeceis')

const schema = gql`
  type Query {
    species: [Specie]
    specieFromId(items_id: ID!): Specie!
    specieFromScientificName(scientific_name: String!): Specie!
    generaFromName(name: String!): [Specie]
    familyFromName(name: String!): [Specie]
  }

  type Specie {
    items_id: ID!
    scientific_name: ID!
    local_names: [String]
    behaviour: String
    description: String
    similar_species: [String]
    size: Size
    distribution: String
    habitat: String
    flight_period: String
    red_list: RedList
  }

  type Size {
    length: String!
    wingspan: String!
  }

  type RedList {
    habitats_directive: String!
    red_list_EU27: String!
    red_list_europe: String!
    red_list_mediterranean: String!
    EU27_endemic: String!
    red_list_europe_endemic: String!
    trend_europe: String!
  }
`
const resolvers = {
  Query: {
    species: () => allSpecies(species),
    specieFromId: (parent, { items_id }) => {
      const specie = allSpecies(species).find(
        specie => specie.items_id === items_id
      )
      if (!specie) return new ApolloError(`Specie not found: ${items_id}`)
      return specie
    },
    specieFromScientificName: (parent, { scientific_name }) => {
      scientific_name = scientific_name.toLowerCase()
      const specie = allSpecies(species).find(
        specie => specie.scientific_name.toLowerCase() === scientific_name
      )
      if (!specie) {
        return new ApolloError(`Specie not found: ${scientific_name}`)
      }
      return specie
    },
    generaFromName: (parent, { name }) => {
      const allGeneras = Object.values(species).reduce((acc, family) => {
        Object.keys(family).forEach(key => (acc[key] = family[key]))
        return acc
      }, {})
      const genera = allGeneras[name.toLowerCase()]
      if (!genera) return new ApolloError(`Genera not found: ${name}`)
      return genera
    },
    familyFromName: (parent, { name }) => {
      const family = species[name.toLowerCase()]
      if (!family) return new ApolloError(`Family not found: ${name}`)

      return Object.values(family).reduce(
        (acc, genera) => acc.concat(genera),
        []
      )
    }
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const users = process.env.API_USERS.split(' ')
    if (users.includes(token)) {
      return
    } else {
      throw new Error('USER NOT FOUND')
    }
  }
})

module.exports = server.createHandler({ path: '/api' })

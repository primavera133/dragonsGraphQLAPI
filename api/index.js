const { ApolloServer, gql } = require('apollo-server-micro')
const species = require('./data/index.js')

const schema = gql`
  type Query {
    species: [Specie]
    specie(items_id: ID!): Specie
  }

  type Specie {
    items_id: String!
    scientific_name: String!
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
    species: () => {
      return species.aeshnidae
    },
    specie: (parent, { items_id, scientific_name }) => {
      if (items_id) {
        return {
          ...species.aeshnidae.find(specie => specie.items_id === items_id)
        }
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true
})

module.exports = server.createHandler({ path: '/api' })

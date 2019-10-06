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
  }

  type Size {
    length: String!
    wingspan: String!
  }
`
const resolvers = {
  Query: {
    species: () => {
      return species
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

import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

import species from './data/index.js'

const app = express()
app.use(cors())

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
  introspection: true, // enables introspection of the schema
  playground: true // enables the actual playground
})
server.applyMiddleware({ app, path: '/graphql' })
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql')
})

export default app

// Load environment variables
require('dotenv').config()

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const typeDefs = require('./_schema')
const { createSpeciesStore, createAboutStore } = require('./_utils/createStore')
const SpeciesAPI = require('./_dataStores/SpeciesAPI')
const AboutAPI = require('./_dataStores/AboutAPI')
const resolvers = require('./_resolvers')

const speciesStore = createSpeciesStore()
const aboutStore = createAboutStore()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
})

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const speciesAPI = new SpeciesAPI({ store: speciesStore })
      const aboutAPI = new AboutAPI({ store: aboutStore })
      
      // Initialize the data sources
      speciesAPI.initialize({ context: { req, res } })
      aboutAPI.initialize({ context: { req, res } })
      
      return {
        req,
        res,
        dataSources: {
          speciesAPI,
          aboutAPI
        }
      }
    }
  })

  console.log(`🚀 Server ready at ${url}`)
  console.log(`🔍 GraphQL Playground available at ${url}`)
}

startServer().catch(error => {
  console.error('Error starting server:', error)
  process.exit(1)
})

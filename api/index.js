const { ApolloServer } = require('apollo-server-micro')
const microCors = require('micro-cors')
const cors = microCors({ allowMethods: ['PUT', 'POST'] })

const typeDefs = require('./schema')
const { createSpeciesStore, createGenusStore } = require('./utils/createStore')
const SpeciesAPI = require('./dataStores/SpeciesAPI')
const GenusAPI = require('./dataStores/GenusAPI')
const resolvers = require('./resolvers')

const speciesStore = createSpeciesStore()
const genusStore = createGenusStore()

const dataSources = () => ({
  speciesAPI: new SpeciesAPI({ store: speciesStore }),
  genusAPI: new GenusAPI({ store: genusStore })
})

const context = require('./context')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
})

module.exports = cors(server.createHandler({ path: '/api' }))

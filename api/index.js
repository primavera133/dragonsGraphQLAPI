const { ApolloServer } = require('apollo-server-micro')
const microCors = require('micro-cors')
const cors = microCors({ allowMethods: ['PUT', 'POST'] })

const typeDefs = require('./schema')
const { createSpeciesStore, createAboutStore } = require('./utils/createStore')
const SpeciesAPI = require('./dataStores/SpeciesAPI')
const AboutAPI = require('./dataStores/AboutAPI')
const resolvers = require('./resolvers')

const speciesStore = createSpeciesStore()
const aboutStore = createAboutStore()

const dataSources = () => ({
  speciesAPI: new SpeciesAPI({ store: speciesStore }),
  aboutAPI: new AboutAPI({ store: aboutStore })
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

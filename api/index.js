const { ApolloServer } = require('apollo-server-micro')
const microCors = require('micro-cors')
const cors = microCors({ allowMethods: ['PUT', 'POST'] })

const typeDefs = require('./_schema')
const { createSpeciesStore, createAboutStore } = require('./_utils/createStore')
const SpeciesAPI = require('./_dataStores/SpeciesAPI')
const AboutAPI = require('./_dataStores/AboutAPI')
const resolvers = require('./_resolvers')

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

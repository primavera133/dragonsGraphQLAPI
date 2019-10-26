const { ApolloServer } = require('apollo-server-micro')
const microCors = require('micro-cors')
const cors = microCors({ allowMethods: ['PUT', 'POST'] })

const typeDefs = require('./schema')
const { createStore } = require('./utils/createStore')
const SpeciesAPI = require('./dataStores/SpeciesAPI')
const resolvers = require('./resolvers')

const store = createStore()

const dataSources = () => ({
  speciesAPI: new SpeciesAPI({ store })
})

const context = require('./context')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  introspection: true,
  playground: true
})

module.exports = cors(server.createHandler({ path: '/api' }))

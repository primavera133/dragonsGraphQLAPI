const micro = require('micro')
const listen = require('test-listen')
const fetch = require('node-fetch')
const { execute, toPromise } = require('apollo-link')
const { HttpLink } = require('apollo-link-http')

const context = require('../context')
const typeDefs = require('../schema')
const resolvers = require('../resolvers')
const { ApolloServer } = require('apollo-server-micro')
const SpeciesAPI = require('../dataStores/SpeciesAPI')
const { createStore } = require('../utils/createStore')
const store = createStore()

module.exports.toPromise = toPromise

async function createServer (options = {}) {
  const speciesAPI = new SpeciesAPI({ store })
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ speciesAPI }),
    context
  })

  const service = micro(apolloServer.createHandler(options))
  const uri = await listen(service)

  const link = new HttpLink({
    uri: `${uri}/graphql`,
    fetch
  })

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables })

  return {
    service,
    executeOperation
  }
}
module.exports.createServer = createServer

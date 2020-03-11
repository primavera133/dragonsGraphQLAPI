const micro = require('micro')
const listen = require('test-listen')
const fetch = require('node-fetch')
const { execute, toPromise } = require('apollo-link')
const { HttpLink } = require('apollo-link-http')

const context = require('../_context')
const typeDefs = require('../_schema')
const resolvers = require('../_resolvers')
const { ApolloServer } = require('apollo-server-micro')
const SpeciesAPI = require('../_dataStores/SpeciesAPI')
const AboutAPI = require('../_dataStores/AboutAPI')
const {
  createSpeciesStore,
  createAboutStore
} = require('../_utils/createStore')
const speciesStore = createSpeciesStore()
const aboutStore = createAboutStore()

module.exports.toPromise = toPromise

async function createServer (options = {}) {
  const speciesAPI = new SpeciesAPI({ store: speciesStore })
  const aboutAPI = new AboutAPI({ store: aboutStore })
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ speciesAPI, aboutAPI }),
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

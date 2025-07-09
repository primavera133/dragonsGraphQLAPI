const fetch = require('node-fetch')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const typeDefs = require('../_schema')
const resolvers = require('../_resolvers')
const SpeciesAPI = require('../_dataStores/SpeciesAPI')
const AboutAPI = require('../_dataStores/AboutAPI')
const {
  createSpeciesStore,
  createAboutStore
} = require('../_utils/createStore')

const speciesStore = createSpeciesStore()
const aboutStore = createAboutStore()

async function createServer (options = {}) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 0 }, // Use random available port
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

  const executeOperation = async ({ query, variables = {} }) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: typeof query === 'string' ? query : query.loc.source.body,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  }

  return {
    url,
    server,
    executeOperation
  }
}
module.exports = {
  createServer
}

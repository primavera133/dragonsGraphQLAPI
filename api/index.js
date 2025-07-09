const { ApolloServer } = require('@apollo/server')
const { startServerAndCreateNextHandler } = require('@as-integrations/next')
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
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse(requestContext) {
            const { response } = requestContext
            response.http.headers.set('Access-Control-Allow-Origin', '*')
            response.http.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            response.http.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
          },
        }
      },
    },
  ],
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
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

module.exports = handler

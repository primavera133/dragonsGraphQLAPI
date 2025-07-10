const { ApolloServer } = require('@apollo/server')
const { startServerAndCreateNextHandler } = require('@as-integrations/next')
const { GraphQLError } = require('graphql')

const typeDefs = require('./_schema')
const { createSpeciesStore, createAboutStore } = require('./_utils/createStore')
const SpeciesAPI = require('./_dataStores/SpeciesAPI')
const AboutAPI = require('./_dataStores/AboutAPI')
const resolvers = require('./_resolvers')
const { authenticateRequest } = require('./_middleware/auth')

const speciesStore = createSpeciesStore()
const aboutStore = createAboutStore()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production', // Disable introspection in production
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse(requestContext) {
            const { response } = requestContext
            response.http.headers.set('Access-Control-Allow-Origin', '*')
            response.http.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            response.http.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
            
            // Add security headers
            response.http.headers.set('X-Content-Type-Options', 'nosniff')
            response.http.headers.set('X-Frame-Options', 'DENY')
            response.http.headers.set('X-XSS-Protection', '1; mode=block')
          },
        }
      },
    },
  ],
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    try {
      // Require valid API key for all requests
      const authInfo = authenticateRequest(req)
      
      const speciesAPI = new SpeciesAPI({ store: speciesStore })
      const aboutAPI = new AboutAPI({ store: aboutStore })
      
      // Initialize the data sources
      speciesAPI.initialize({ context: { req, res } })
      aboutAPI.initialize({ context: { req, res } })
      
      return {
        req,
        res,
        auth: authInfo,
        dataSources: {
          speciesAPI,
          aboutAPI
        }
      }
      
    } catch (error) {
      // Re-throw GraphQL errors (like authentication failures) so they're handled properly
      if (error instanceof GraphQLError) {
        throw error
      }
      
      // Handle unexpected errors
      throw new GraphQLError('Server error', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' }
      })
    }
  }
})

module.exports = handler

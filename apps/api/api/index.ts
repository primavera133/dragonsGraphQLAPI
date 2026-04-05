import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { GraphQLError } from 'graphql'

import typeDefs from '../_schema'
import { createSpeciesStore, createAboutStore } from '../_utils/createStore'
import SpeciesAPI from '../_dataStores/SpeciesAPI'
import AboutAPI from '../_dataStores/AboutAPI'
import resolvers from '../_resolvers'
import { authenticateRequest } from '../_middleware/auth'

const speciesStore = createSpeciesStore()
const aboutStore = createAboutStore()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  plugins: [
    {
      requestDidStart() {
        return Promise.resolve({
          async willSendResponse(requestContext: { response: { http: { headers: { set: (k: string, v: string) => void } } } }) {
            const { response } = requestContext
            response.http.headers.set('Access-Control-Allow-Origin', '*')
            response.http.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            response.http.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
            response.http.headers.set('X-Content-Type-Options', 'nosniff')
            response.http.headers.set('X-Frame-Options', 'DENY')
            response.http.headers.set('X-XSS-Protection', '1; mode=block')
          },
        })
      },
    },
  ],
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    try {
      const authInfo = authenticateRequest(req as Parameters<typeof authenticateRequest>[0])

      const speciesAPI = new SpeciesAPI({ store: speciesStore })
      const aboutAPI = new AboutAPI({ store: aboutStore })

      speciesAPI.initialize({ context: { req, res } })
      aboutAPI.initialize({ context: { req, res } })

      return {
        req,
        res,
        auth: authInfo,
        dataSources: { speciesAPI, aboutAPI },
      }
    } catch (error) {
      if (error instanceof GraphQLError) throw error
      throw new GraphQLError('Server error', {
        extensions: { code: 'INTERNAL_SERVER_ERROR' },
      })
    }
  },
})

export default handler

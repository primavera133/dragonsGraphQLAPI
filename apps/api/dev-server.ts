import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import typeDefs from './_schema'
import { createSpeciesStore, createAboutStore } from './_utils/createStore'
import SpeciesAPI from './_dataStores/SpeciesAPI'
import AboutAPI from './_dataStores/AboutAPI'
import resolvers from './_resolvers'

const speciesStore = createSpeciesStore()
const aboutStore = createAboutStore()

const server = new ApolloServer({ typeDefs, resolvers, introspection: true })

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const speciesAPI = new SpeciesAPI({ store: speciesStore })
      const aboutAPI = new AboutAPI({ store: aboutStore })

      speciesAPI.initialize({ context: { req, res } })
      aboutAPI.initialize({ context: { req, res } })

      return {
        req,
        res,
        dataSources: { speciesAPI, aboutAPI },
      }
    },
  })

  console.log(`🚀 Server ready at ${url}`)
  console.log(`🔍 GraphQL Playground available at ${url}`)
}

startServer().catch((error) => {
  console.error('Error starting server:', error)
  process.exit(1)
})

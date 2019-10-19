const { ApolloServer, gql, ApolloError } = require('apollo-server-micro')
const species = require('./data/index.js')
const allSpecies = require('./utils/allSpeceis')

const speciesResolver = require('./resolvers/species')
const specieFromIdResolver = require('./resolvers/specieFromId')
const specieFromScientificNameResolver = require('./resolvers/specieFromScientificName')
const generaFromNameResolver = require('./resolvers/generaFromName')
const familyFromNameResolver = require('./resolvers/familyFromName')

var Logger = require('logdna')
var loggerOptions = {
  app: 'dragonsgraphqlapi',
  env: process.env.NODE_ENV,
  index_meta: true
}

var logger = Logger.createLogger(process.env.LOG_DNA_INGESTION_KEY, loggerOptions);

const schema = gql`
  type Query {
    species: [Specie]
    specieFromId(items_id: ID!): Specie!
    specieFromScientificName(scientific_name: String!): Specie!
    generaFromName(name: String!): [Specie]
    familyFromName(name: String!): [Specie]
  }

  type Specie {
    items_id: ID!
    scientific_name: ID!
    local_names: [String]
    behaviour: String
    description: String
    similar_species: [String]
    size: Size
    distribution: String
    habitat: String
    flight_period: String
    red_list: RedList
  }

  type Size {
    length: String!
    wingspan: String!
  }

  type RedList {
    habitats_directive: String!
    red_list_EU27: String!
    red_list_europe: String!
    red_list_mediterranean: String!
    EU27_endemic: String!
    red_list_europe_endemic: String!
    trend_europe: String!
  }
`
const resolvers = {
  Query: {
    species: speciesResolver,
    specieFromId: specieFromIdResolver,
    specieFromScientificName: specieFromScientificNameResolver,
    generaFromName: generaFromNameResolver,
    familyFromName: familyFromNameResolver
  }
}

class BasicLogging {
  requestDidStart({ queryString, parsedQuery, variables, context }) {
    const { user } = context
    const query = queryString || print(parsedQuery)
    if (query.includes('IntrospectionQuery')) {
      // logger.info('IntrospectionQuery', { level: 'info', meta: { query, variables, user } })
    } else {
      logger.info('query', { level: 'info', meta: { query, variables, user } })
    }
  }

  willSendResponse({ graphqlResponse, context }) {
    const { user } = context
    // logger.info('response', { level: 'info', meta: { response: JSON.stringify(graphqlResponse, null, 2) }, user })
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true,
  extensions: [() => new BasicLogging()],
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const users = process.env.API_USERS || ''
    const usersArr = users.split(' ')

    if (!usersArr.includes(token)) {
      throw new Error('USER NOT FOUND')
    }

    return {
      user: token
    }
  }
})

module.exports = server.createHandler({ path: '/api' })

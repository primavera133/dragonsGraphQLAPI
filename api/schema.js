const { gql } = require('apollo-server-micro')

const typeDefs = gql`
  type Query {
    species: [Specie]
    specieFromId(items_id: ID!): Specie
    specieFromScientificName(scientific_name: String!): Specie
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
    length: String
    wingspan: String
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

module.exports = typeDefs

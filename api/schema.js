const { gql } = require('apollo-server-micro')

const typeDefs = gql`
  type Query {
    species: [Specie]
    specieFromId(items_id: ID!): Specie
    specieFromScientificName(scientific_name: String!): Specie
    generaSpecies(name: String!): [Specie]
    familySpecies(name: String!): [Specie]
    families: [Family]
    familyGeneras(name: String!): [Genera]
    taxonomy: Taxonomy
  }

  type Taxonomy {
    families: [Family]
  }

  type Family {
    family_name: ID!
    generas: [Genera]
  }

  type Genera {
    genera_name: ID!
    species: [Specie]
  }

  type Specie {
    items_id: ID!
    scientific_name: ID!
    author_citation: String
    local_names: [String]
    behaviour: String
    description: String
    similar_species: [String]
    size: Size
    distribution: String
    habitat: String
    flight_period: String
    red_list: RedList
    images: Images
    sources: [String]
  }

  type Images {
    cloud_name: String
    all: [ImageData]
  }

  type ImageData {
    public_id: String!
    caption: String!
    license: String!
    lic_url: String!
    by: String!
    url: String
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

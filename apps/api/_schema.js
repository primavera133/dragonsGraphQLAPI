const { gql } = require('graphql-tag')

const typeDefs = gql`
  type Query {
    aboutGenus(name: String!): GenusInfo
    aboutFamily(name: String!): FamilyInfo
    families: [Family]
    familyGenera(name: String!): [GenusName]
    familySpecies(name: String!): [Specie]
    genera: [Genus]
    genusSpecies(name: String!): [Specie]
    species: [Specie]
    specieFromId(items_id: ID!): Specie
    specieFromScientificName(scientific_name: String!): Specie
    taxonomy: Taxonomy
  }

  type Taxonomy {
    families: [Family]
    genera: [Genus]
  }

  type Family {
    family_name: ID!
    genera: [Genus]
  }

  type Genus {
    family_name: String!
    genus_name: ID
    species: [Specie]
  }

  type GenusName {
    genus_name: ID
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
    links: [Link]
    meta: [Meta]
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

  type Link {
    label: String!
    link: String!
  }

  type Meta {
    label: String!
    value: String!
  }

  type GenusInfo {
    title: String!
    author_citation: String!
    description: String!
    sources: [String]
    links: [Link]
    meta: [Meta]
  }

  type FamilyInfo {
    title: String!
    author_citation: String!
    description: String!
    sources: [String]
    links: [Link]
    meta: [Meta]
  }
`

module.exports = typeDefs

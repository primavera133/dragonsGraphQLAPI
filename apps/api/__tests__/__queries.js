const gql = require('graphql-tag')

// Shared fragments
const SPECIES_FRAGMENT = gql`
  fragment SpeciesDetails on Specie {
    items_id
    scientific_name
    author_citation
    local_names
    behaviour
    description
    distribution
    habitat
    flight_period
    size {
      length
      wingspan
    }
    similar_species
    red_list {
      habitats_directive
      red_list_EU27
      red_list_europe
      red_list_mediterranean
      EU27_endemic
      red_list_europe_endemic
      trend_europe
    }
    images {
      cloud_name
      all {
        public_id
        caption
        license
        lic_url
        by
        url
      }
    }
    sources
    links {
      label
      link
    }
    meta {
      label
      value
    }
  }
`

const FAMILY_FRAGMENT = gql`
  fragment FamilyDetails on Family {
    family_name
  }
`

const GENUS_FRAGMENT = gql`
  fragment GenusDetails on Genus {
    genus_name
    family_name
  }
`

// Shared queries
const GET_ALL_SPECIES_QUERY = gql`
  query GetAllSpecies {
    species {
      ...SpeciesDetails
    }
  }
  ${SPECIES_FRAGMENT}
`

const GET_SPECIES_BY_ID_QUERY = gql`
  query GetSpeciesById($items_id: ID!) {
    specieFromId(items_id: $items_id) {
      ...SpeciesDetails
    }
  }
  ${SPECIES_FRAGMENT}
`

const GET_SPECIES_BY_SCIENTIFIC_NAME_QUERY = gql`
  query GetSpeciesByScientificName($scientific_name: String!) {
    specieFromScientificName(scientific_name: $scientific_name) {
      ...SpeciesDetails
    }
  }
  ${SPECIES_FRAGMENT}
`

const GET_SPECIES_BY_FAMILY_QUERY = gql`
  query GetSpeciesByFamily($name: String!) {
    familySpecies(name: $name) {
      ...SpeciesDetails
    }
  }
  ${SPECIES_FRAGMENT}
`

const GET_SPECIES_BY_GENUS_QUERY = gql`
  query GetSpeciesByGenus($name: String!) {
    genusSpecies(name: $name) {
      ...SpeciesDetails
    }
  }
  ${SPECIES_FRAGMENT}
`

const GET_ALL_FAMILIES_QUERY = gql`
  query GetAllFamilies {
    families {
      ...FamilyDetails
    }
  }
  ${FAMILY_FRAGMENT}
`

const GET_ALL_GENERA_QUERY = gql`
  query GetAllGenera {
    genera {
      family_name
      genus_name
      species {
        scientific_name
      }
    }
  }
`

const GET_TAXONOMY_QUERY = gql`
  query GetTaxonomy {
    taxonomy {
      families {
        family_name
        genera {
          family_name
          genus_name
          species {
            items_id
            scientific_name
            local_names
          }
        }
      }
    }
  }
`

const GET_ABOUT_FAMILY_QUERY = gql`
  query GetAboutFamily($name: String!) {
    aboutFamily(name: $name) {
      title
      author_citation
      description
      sources
      links {
        label
        link
      }
      meta {
        label
        value
      }
    }
  }
`

const GET_ABOUT_GENUS_QUERY = gql`
  query GetAboutGenus($name: String!) {
    aboutGenus(name: $name) {
      title
      author_citation
      description
      sources
      links {
        label
        link
      }
      meta {
        label
        value
      }
    }
  }
`

const GET_FAMILY_GENERA_QUERY = gql`
  query GetFamilyGenera($name: String!) {
    familyGenera(name: $name) {
      genus_name
    }
  }
`

module.exports = {
  // Fragments
  SPECIES_FRAGMENT,
  FAMILY_FRAGMENT,
  GENUS_FRAGMENT,
  
  // Queries
  GET_ALL_SPECIES_QUERY,
  GET_SPECIES_BY_ID_QUERY,
  GET_SPECIES_BY_SCIENTIFIC_NAME_QUERY,
  GET_SPECIES_BY_FAMILY_QUERY,
  GET_SPECIES_BY_GENUS_QUERY,
  GET_ALL_FAMILIES_QUERY,
  GET_ALL_GENERA_QUERY,
  GET_TAXONOMY_QUERY,
  GET_ABOUT_FAMILY_QUERY,
  GET_ABOUT_GENUS_QUERY,
  GET_FAMILY_GENERA_QUERY
}

module.exports = {
  Query: {
    families: (_, __, { dataSources }) =>
      dataSources.speciesAPI.getAllFamilies(),

    genera: (_, __, { dataSources }) => dataSources.speciesAPI.getAllGenera(),

    species: (_, __, { dataSources }) => dataSources.speciesAPI.getAllSpecies(),

    familySpecies: (_, { name }, { dataSources }) =>
      dataSources.speciesAPI.findFamilySpecies(name),

    familyGenera: (_, { name }, { dataSources }) =>
      dataSources.speciesAPI.findGenusFromFamilyName(name),

    genusSpecies: (_, { name }, { dataSources }) =>
      dataSources.speciesAPI.findGenusSpecies(name),

    specieFromId: (_, { items_id }, { dataSources }) =>
      dataSources.speciesAPI.findSpecieFromId(items_id),

    specieFromScientificName: (_, { scientific_name }, { dataSources }) =>
      dataSources.speciesAPI.findSpecieFromScientificName(scientific_name),

    taxonomy: (_, __, { dataSources }) =>
      dataSources.speciesAPI.getFullTaxonomy()
  }
}

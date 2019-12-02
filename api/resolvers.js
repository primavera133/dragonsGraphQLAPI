module.exports = {
  Query: {
    families: (_, __, { dataSources }) =>
      dataSources.speciesAPI.getAllFamilies(),

    species: (_, __, { dataSources }) => dataSources.speciesAPI.getAllSpecies(),

    familySpecies: (_, { name }, { dataSources }) =>
      dataSources.speciesAPI.findFamilySpecies(name),

    familyGeneras: (_, { name }, { dataSources }) =>
      dataSources.speciesAPI.findGenerasFromFamilyName(name),

    generaSpecies: (_, { name }, { dataSources }) =>
      dataSources.speciesAPI.findGeneraSpecies(name),

    specieFromId: (_, { items_id }, { dataSources }) =>
      dataSources.speciesAPI.findSpecieFromId(items_id),

    specieFromScientificName: (_, { scientific_name }, { dataSources }) =>
      dataSources.speciesAPI.findSpecieFromScientificName(scientific_name),

    taxonomy: (_, __, { dataSources }) =>
      dataSources.speciesAPI.getFullTaxonomy()
  }
}

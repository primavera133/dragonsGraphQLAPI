module.exports = {
  Query: {
    familyFromName: (_, { name }, { dataSources }) =>
      dataSources.speciesAPI.findFamilyFromName(name),

    generaFromName: (_, { name }, { dataSources }) =>
      dataSources.speciesAPI.findGeneraFromName(name),

    specieFromId: (_, { items_id }, { dataSources }) =>
      dataSources.speciesAPI.findSpecieFromId(items_id),

    specieFromScientificName: (_, { scientific_name }, { dataSources }) =>
      dataSources.speciesAPI.findSpecieFromScientificName(scientific_name),

    species: (_, __, { dataSources }) => dataSources.speciesAPI.getAllSpecies()
  }
}

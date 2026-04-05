import type { AppContext } from './_types'

const resolvers = {
  Query: {
    families: (_: unknown, __: unknown, { dataSources }: AppContext) =>
      dataSources.speciesAPI.getAllFamilies(),

    genera: (_: unknown, __: unknown, { dataSources }: AppContext) =>
      dataSources.speciesAPI.getAllGenera(),

    aboutGenus: (_: unknown, { name }: { name: string }, { dataSources }: AppContext) =>
      dataSources.aboutAPI.aboutGenus(name),

    aboutFamily: (_: unknown, { name }: { name: string }, { dataSources }: AppContext) =>
      dataSources.aboutAPI.aboutFamily(name),

    species: (_: unknown, __: unknown, { dataSources }: AppContext) =>
      dataSources.speciesAPI.getAllSpecies(),

    familySpecies: (_: unknown, { name }: { name: string }, { dataSources }: AppContext) =>
      dataSources.speciesAPI.findFamilySpecies(name),

    familyGenera: (_: unknown, { name }: { name: string }, { dataSources }: AppContext) =>
      dataSources.speciesAPI.findGenusFromFamilyName(name),

    genusSpecies: (_: unknown, { name }: { name: string }, { dataSources }: AppContext) =>
      dataSources.speciesAPI.findGenusSpecies(name),

    specieFromId: (_: unknown, { items_id }: { items_id: string }, { dataSources }: AppContext) =>
      dataSources.speciesAPI.findSpecieFromId(items_id),

    specieFromScientificName: (
      _: unknown,
      { scientific_name }: { scientific_name: string },
      { dataSources }: AppContext,
    ) => dataSources.speciesAPI.findSpecieFromScientificName(scientific_name),

    taxonomy: (_: unknown, __: unknown, { dataSources }: AppContext) =>
      dataSources.speciesAPI.getFullTaxonomy(),
  },
}

export = resolvers

import { z } from 'zod'
import { SpecieSchema, TaxonInfoSchema } from '../_schemas/index'
import species from '../_data/index'
import allSpeciesUtil from './allSpeceis'
import allFamiliesUtil from './allFamilies'
import allGeneraUtil from './allGenera'
import genera from '../_data/genera'
import families from '../_data/families'
import type { SpeciesStore, AboutStore } from '../_types'

export function createSpeciesStore(): SpeciesStore {
  const allSpeciesArr = allSpeciesUtil(species)
  z.array(SpecieSchema).parse(allSpeciesArr)

  return {
    species,
    allSpecies: allSpeciesArr,
    allFamilies: allFamiliesUtil(species),
    allGenera: allGeneraUtil(species),
  }
}

export function createAboutStore(): AboutStore {
  Object.values(families).forEach((family) => TaxonInfoSchema.parse(family))
  Object.values(genera).forEach((genus) => TaxonInfoSchema.parse(genus))

  return { genera, families }
}

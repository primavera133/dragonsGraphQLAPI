import type { SpeciesData } from '../_types'

const allFamilies = (species: SpeciesData): { family_name: string }[] => {
  return Object.keys(species).map((family_name) => ({
    family_name: family_name.replace('_', ' '),
  }))
}

export = allFamilies

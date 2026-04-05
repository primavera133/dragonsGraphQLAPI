import type { Genus, SpeciesData, Specie } from '../_types'

const allGenera = (species: SpeciesData): Genus[] => {
  const genera: Genus[] = []
  Object.keys(species).forEach((familyName) => {
    Object.keys(species[familyName]).forEach((genus_name) => {
      genera.push({
        family_name: familyName,
        genus_name,
        species: species[familyName][genus_name] as Specie[],
      })
    })
  })
  return genera
}

export = allGenera

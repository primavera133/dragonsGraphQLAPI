import type { Specie, SpeciesData } from '../_types'

const allSpecies = (species: SpeciesData): Specie[] => {
  const families = Object.values(species)
  return families.reduce((acc: Specie[], family) => {
    const genera = Object.values(family)
    return acc.concat(genera.reduce((a: Specie[], g) => a.concat(g as Specie[]), []))
  }, [])
}

export = allSpecies

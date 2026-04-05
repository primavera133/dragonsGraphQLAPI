import { GraphQLError } from 'graphql'
import type { SpeciesStore, Specie, Genus, GenusName } from '../_types'

class SpeciesAPI {
  private store: SpeciesStore
  private context: unknown

  constructor({ store }: { store: SpeciesStore }) {
    this.store = store
  }

  initialize(config: { context: unknown }): void {
    this.context = config.context
  }

  findFamilySpecies(familyName: string): Specie[] {
    const family = this.store.species[familyName.toLowerCase().replace(' ', '_')]
    if (!family) throw new GraphQLError(`Family not found: ${familyName}`)

    return Object.values(family).reduce(
      (acc: Specie[], genera) => acc.concat(genera as Specie[]),
      [],
    )
  }

  findGenusFromFamilyName(familyName: string): GenusName[] {
    const family = this.store.species[familyName.toLowerCase().replace(' ', '_')]
    if (!family) throw new GraphQLError(`Family not found: ${familyName}`)

    return Object.keys(family).map((genus_name) => ({ genus_name }))
  }

  findGenusSpecies(genusName: string): Specie[] {
    const allGenera = Object.values(this.store.species).reduce(
      (acc: Record<string, Specie[]>, family) => {
        Object.keys(family).forEach((key) => {
          acc[key] = family[key] as Specie[]
        })
        return acc
      },
      {},
    )
    const genus = allGenera[genusName.toLowerCase()]
    if (!genus) throw new GraphQLError(`Genus not found: ${genusName}`)
    return genus
  }

  findSpecieFromId(items_id: string): Specie {
    const specie = this.store.allSpecies.find((s) => s.items_id === items_id)
    if (!specie) throw new GraphQLError(`Specie not found: ${items_id}`)
    return specie
  }

  findSpecieFromScientificName(scientific_name: string): Specie {
    const lower = scientific_name.toLowerCase()
    const specie = this.store.allSpecies.find(
      (s) => s.scientific_name.toLowerCase() === lower,
    )
    if (!specie) throw new GraphQLError(`Specie not found: ${scientific_name}`)
    return specie
  }

  getAllSpecies(): Specie[] {
    return this.store.allSpecies
  }

  getAllFamilies(): { family_name: string }[] {
    return this.store.allFamilies
  }

  getAllGenera(): Genus[] {
    return this.store.allGenera
  }

  getFullTaxonomy(): { families: { family_name: string; genera: Genus[] }[] } {
    const families = this.getAllFamilies()
    return {
      families: families.map(({ family_name }) => {
        const genera = this.findGenusFromFamilyName(family_name).map(({ genus_name }) => {
          const speciesArr = this.findGenusSpecies(genus_name as string)
          return {
            family_name,
            genus_name: genus_name as string,
            species: speciesArr,
          }
        })
        return {
          family_name: family_name.replace('_', ' '),
          genera,
        }
      }),
    }
  }
}

export = SpeciesAPI

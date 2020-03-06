const { DataSource } = require('apollo-datasource')
const { ApolloError } = require('apollo-server-micro')

class SpeciesAPI extends DataSource {
  constructor ({ store }) {
    super()
    this.store = store
  }

  initialize (config) {
    this.context = config.context
  }

  findFamilySpecies (familyName) {
    const family = this.store.species[
      familyName.toLowerCase().replace(' ', '_')
    ]
    if (!family) return new ApolloError(`Family not found: ${name}`)

    return Object.values(family).reduce((acc, genera) => acc.concat(genera), [])
  }

  findGenusFromFamilyName (familyName) {
    const family = this.store.species[
      familyName.toLowerCase().replace(' ', '_')
    ]
    if (!family) return new ApolloError(`Family not found: ${name}`)

    return Object.keys(family).map(genus_name => ({
      genus_name
    }))
  }

  findGenusSpecies (genusName) {
    const allGenera = Object.values(this.store.species).reduce(
      (acc, family) => {
        Object.keys(family).forEach(key => (acc[key] = family[key]))
        return acc
      },
      {}
    )
    const genus = allGenera[genusName.toLowerCase()]
    if (!genus) return new ApolloError(`Genus not found: ${genusName}`)
    return genus
  }

  findSpecieFromId (items_id) {
    const specie = this.store.allSpecies.find(
      specie => specie.items_id === items_id
    )
    if (!specie) return new ApolloError(`Specie not found: ${items_id}`)
    return specie
  }

  findSpecieFromScientificName (scientific_name) {
    scientific_name = scientific_name.toLowerCase()
    const specie = this.store.allSpecies.find(
      specie => specie.scientific_name.toLowerCase() === scientific_name
    )

    if (!specie) {
      return new ApolloError(`Specie not found: ${scientific_name}`)
    }
    return specie
  }

  getAllSpecies () {
    return this.store.allSpecies
  }

  // findGenusFromFamilyName (family_name) {}

  getAllFamilies () {
    return this.store.allFamilies
  }

  getAllGenera () {
    return this.store.allGenera
  }

  getFullTaxonomy () {
    const families = this.getAllFamilies()
    // console.log('families', families)
    const taxonomy = {
      families: families.map(({ family_name }) => {
        // console.log('family_name', family_name)
        const genera = this.findGenusFromFamilyName(family_name).map(
          ({ genus_name }) => {
            // console.log('genus_name', genus_name)
            const species = this.findGenusSpecies(genus_name)
            return {
              genus_name,
              species
            }
          }
        )
        return {
          family_name,
          genera
        }
      })
    }

    // console.log('taxonomy', JSON.stringify(taxonomy))
    return taxonomy
  }
}

module.exports = SpeciesAPI

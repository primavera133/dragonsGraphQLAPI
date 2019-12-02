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

  findGenerasFromFamilyName (familyName) {
    const family = this.store.species[
      familyName.toLowerCase().replace(' ', '_')
    ]
    if (!family) return new ApolloError(`Family not found: ${name}`)

    return Object.keys(family).map(genera_name => ({
      genera_name
    }))
  }

  findGeneraSpecies (generaName) {
    const allGeneras = Object.values(this.store.species).reduce(
      (acc, family) => {
        Object.keys(family).forEach(key => (acc[key] = family[key]))
        return acc
      },
      {}
    )
    const genera = allGeneras[generaName.toLowerCase()]
    if (!genera) return new ApolloError(`Genera not found: ${generaName}`)
    return genera
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

  // findGenerasFromFamilyName (family_name) {}

  getAllFamilies () {
    return this.store.allFamilies
  }

  getFullTaxonomy () {
    const families = this.getAllFamilies()
    // console.log('families', families)
    const taxonomy = {
      families: families.map(({ family_name }) => {
        // console.log('family_name', family_name)
        const generas = this.findGenerasFromFamilyName(family_name).map(
          ({ genera_name }) => {
            // console.log('genera_name', genera_name)
            const species = this.findGeneraSpecies(genera_name)
            return {
              genera_name,
              species
            }
          }
        )
        return {
          family_name,
          generas
        }
      })
    }

    // console.log('taxonomy', JSON.stringify(taxonomy))
    return taxonomy
  }
}

module.exports = SpeciesAPI

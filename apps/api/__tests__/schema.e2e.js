const { createServer } = require('./__utils')
const { buildSchema, introspectionFromSchema, getIntrospectionQuery } = require('graphql')

describe('GraphQL Schema Validation', () => {
  let server, executeOperation

  beforeEach(async () => {
    const testServer = await createServer()
    server = testServer.server
    executeOperation = testServer.executeOperation
  })

  afterEach(async () => {
    if (server) {
      await server.stop()
    }
  })

  describe('Schema Introspection', () => {
    it('should allow introspection queries', async () => {
      const res = await executeOperation({
        query: getIntrospectionQuery()
      })
      
      expect(res.errors).toBeUndefined()
      expect(res.data).toBeDefined()
      expect(res.data.__schema).toBeDefined()
      expect(res.data.__schema.types).toBeDefined()
    })

    it('should have all expected query types', async () => {
      const introspectionQuery = `
        query {
          __schema {
            queryType {
              fields {
                name
                type {
                  name
                }
                args {
                  name
                  type {
                    name
                  }
                }
              }
            }
          }
        }
      `
      
      const res = await executeOperation({
        query: introspectionQuery
      })
      
      expect(res.errors).toBeUndefined()
      const queryFields = res.data.__schema.queryType.fields
      const fieldNames = queryFields.map(field => field.name)
      
      // Verify all expected query fields exist
      const expectedFields = [
        'species',
        'specieFromId', 
        'specieFromScientificName',
        'families',
        'familySpecies',
        'genera',
        'genusSpecies',
        'familyGenera',
        'aboutFamily',
        'aboutGenus',
        'taxonomy'
      ]
      
      expectedFields.forEach(field => {
        expect(fieldNames).toContain(field)
      })
    })

    it('should have proper type definitions for Species', async () => {
      const typeQuery = `
        query {
          __type(name: "Specie") {
            name
            fields {
              name
              type {
                name
                kind
              }
            }
          }
        }
      `
      
      const res = await executeOperation({
        query: typeQuery
      })
      
      expect(res.errors).toBeUndefined()
      const speciesType = res.data.__type
      expect(speciesType.name).toBe('Specie')
      
      const fieldNames = speciesType.fields.map(field => field.name)
      const expectedFields = [
        'items_id',
        'scientific_name',
        'author_citation',
        'local_names',
        'behaviour',
        'description',
        'distribution',
        'habitat',
        'flight_period',
        'size',
        'similar_species',
        'red_list',
        'images',
        'sources',
        'links',
        'meta'
      ]
      
      expectedFields.forEach(field => {
        expect(fieldNames).toContain(field)
      })
    })
  })

  describe('Field Type Validation', () => {
    it('should return correct types for all fields', async () => {
      const res = await executeOperation({
        query: `
          query {
            species {
              items_id
              scientific_name
              author_citation
              local_names
              behaviour
              description
              distribution
              habitat
              flight_period
              size {
                length
                wingspan
              }
              similar_species
              red_list {
                habitats_directive
                red_list_EU27
                red_list_europe
                red_list_mediterranean
                EU27_endemic
                red_list_europe_endemic
                trend_europe
              }
              images {
                cloud_name
                all {
                  public_id
                  caption
                  license
                  lic_url
                  by
                  url
                }
              }
              sources
              links {
                label
                link
              }
              meta {
                label
                value
              }
            }
          }
        `
      })
      
      expect(res.errors).toBeUndefined()
      const species = res.data.species
      
      if (species.length > 0) {
        const firstSpecies = species[0]
        
        // Type validations
        expect(typeof firstSpecies.items_id).toBe('string')
        expect(typeof firstSpecies.scientific_name).toBe('string')
        expect(typeof firstSpecies.author_citation).toBe('string')
        expect(Array.isArray(firstSpecies.local_names)).toBe(true)
        expect(typeof firstSpecies.behaviour).toBe('string')
        expect(typeof firstSpecies.description).toBe('string')
        expect(typeof firstSpecies.distribution).toBe('string')
        expect(typeof firstSpecies.habitat).toBe('string')
        expect(typeof firstSpecies.flight_period).toBe('string')
        expect(Array.isArray(firstSpecies.similar_species)).toBe(true)
        expect(Array.isArray(firstSpecies.sources)).toBe(true)
        expect(Array.isArray(firstSpecies.links)).toBe(true)
        expect(Array.isArray(firstSpecies.meta)).toBe(true)
        
        // Nested object validations
        expect(typeof firstSpecies.size).toBe('object')
        expect(typeof firstSpecies.red_list).toBe('object')
        expect(typeof firstSpecies.images).toBe('object')
      }
    })

    it('should handle null values appropriately', async () => {
      // Test with a query that might return null values
      const res = await executeOperation({
        query: `
          query {
            specieFromId(items_id: "nonexistent") {
              items_id
              scientific_name
            }
          }
        `
      })
      
      // Should return errors for not found items
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('Specie not found')
      expect(res.data.specieFromId).toBeNull()
    })
  })

  describe('Argument Validation', () => {
    it('should validate required arguments', async () => {
      const res = await executeOperation({
        query: `
          query {
            specieFromId {
              items_id
            }
          }
        `
      })
      
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('items_id')
    })

    it('should validate argument types', async () => {
      const res = await executeOperation({
        query: `
          query {
            specieFromId(items_id: 123) {
              items_id
            }
          }
        `
      })
      
      expect(res.errors).toBeDefined()
      // GraphQL will validate the type at query time, or at runtime it will find no specie
      expect(res.errors[0].message).toMatch(/Expected type|Specie not found/)
    })
  })
})

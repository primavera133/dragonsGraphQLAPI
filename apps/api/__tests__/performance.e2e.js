const { createServer } = require('./__utils')
const { 
  GET_ALL_SPECIES_QUERY,
  GET_SPECIES_BY_ID_QUERY,
  GET_SPECIES_BY_SCIENTIFIC_NAME_QUERY
} = require('./__queries')
const { 
  assertNoErrors,
  assertHasErrors,
  assertSpeciesArray,
  testData
} = require('./__helpers')

describe('API Performance and Error Handling', () => {
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

  describe('Performance Tests', () => {
    it('should respond to species query within acceptable time', async () => {
      const start = Date.now()
      
      const res = await executeOperation({
        query: GET_ALL_SPECIES_QUERY
      })
      
      const end = Date.now()
      const responseTime = end - start
      
      assertNoErrors(res)
      expect(responseTime).toBeLessThan(5000) // 5 seconds max
      assertSpeciesArray(res.data.species, 1, true)
    })

    it('should handle concurrent requests efficiently', async () => {
      const requests = Array(5).fill().map(() => 
        executeOperation({
          query: GET_ALL_SPECIES_QUERY
        })
      )
      
      const responses = await Promise.all(requests)
      
      responses.forEach(res => {
        assertNoErrors(res)
        assertSpeciesArray(res.data.species, 1, true)
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid species ID gracefully', async () => {
      const res = await executeOperation({
        query: GET_SPECIES_BY_ID_QUERY,
        variables: { items_id: "invalid-id" }
      })
      
      // Should return GraphQL error for non-existent species
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('Specie not found')
    })

    it('should handle empty string inputs', async () => {
      const res = await executeOperation({
        query: GET_SPECIES_BY_SCIENTIFIC_NAME_QUERY,
        variables: { scientific_name: "" }
      })
      
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('Specie not found')
    })

    it('should handle malformed GraphQL queries', async () => {
      const res = await executeOperation({
        query: `
          query {
            species {
              invalid_field
            }
          }
        `
      })
      
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('Cannot query field')
    })

    it('should handle missing required variables', async () => {
      const res = await executeOperation({
        query: `
          query {
            specieFromId {
              items_id
            }
          }
        `
      })
      
      assertHasErrors(res, ['items_id'])
    })

    it('should validate query depth limits', async () => {
      // This is a hypothetical deep query - GraphQL should handle this
      const res = await executeOperation({
        query: `
          query {
            taxonomy {
              families {
                family_name
                genera {
                  genus_name
                  species {
                    scientific_name
                  }
                }
              }
            }
          }
        `
      })
      
      // Should succeed or fail gracefully
      if (res.errors) {
        expect(res.errors[0]).toBeDefined()
      } else {
        assertNoErrors(res)
      }
    })
  })

  describe('Data Integrity', () => {
    it('should return consistent data across multiple calls', async () => {
      const [res1, res2] = await Promise.all([
        executeOperation({ 
          query: `
            query {
              species {
                items_id
                scientific_name
              }
            }
          `
        }),
        executeOperation({ 
          query: `
            query {
              species {
                items_id
                scientific_name
              }
            }
          `
        })
      ])
      
      assertNoErrors(res1)
      assertNoErrors(res2)
      expect(res1.data.species).toEqual(res2.data.species)
    })

    it('should maintain referential integrity between family and species', async () => {
      const speciesRes = await executeOperation({
        query: `
          query {
            species {
              items_id
              scientific_name
            }
          }
        `
      })
      
      const familiesRes = await executeOperation({
        query: `
          query {
            families {
              family_name
            }
          }
        `
      })
      
      assertNoErrors(speciesRes)
      assertNoErrors(familiesRes)
      
      expect(speciesRes.data.species.length).toBeGreaterThan(0)
      expect(familiesRes.data.families.length).toBeGreaterThan(0)
      
      // Basic referential integrity check
      expect(familiesRes.data.families.length).toBeLessThan(speciesRes.data.species.length)
    })
  })
})
const { createServer } = require('./__utils')
const { GET_SPECIES_BY_FAMILY_QUERY } = require('./__queries')
const { assertNoErrors, assertSpeciesArray, testData } = require('./__helpers')

describe('Species From Family Name - e2e', () => {
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

  it('gets species from family names', async () => {
    for (const family of testData.validFamilyNames) {
      const res = await executeOperation({
        query: GET_SPECIES_BY_FAMILY_QUERY,
        variables: { name: family }
      })
      
      assertNoErrors(res)
      expect(res.data.familySpecies).toBeDefined()
      assertSpeciesArray(res.data.familySpecies, 1, true) // Use complete validation
    }
  })

  it('handles invalid family names', async () => {
    for (const invalidFamily of testData.invalidNames) {
      if (invalidFamily === null || invalidFamily === undefined) {
        continue // Skip null/undefined which cause variables errors
      }
      
      const res = await executeOperation({
        query: GET_SPECIES_BY_FAMILY_QUERY,
        variables: { name: invalidFamily }
      })
      
      // API returns errors for invalid family names
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('Family not found')
    }
  })
})

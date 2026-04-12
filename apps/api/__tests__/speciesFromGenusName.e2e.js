const { createServer } = require('./__utils')
const { GET_SPECIES_BY_GENUS_QUERY } = require('./__queries')
const { assertNoErrors, assertSpeciesArray, testData } = require('./__helpers')

describe('Species From Genus Name - e2e', () => {
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

  it('gets species from genus names', async () => {
    for (const genus of testData.validGenusNames) {
      const res = await executeOperation({
        query: GET_SPECIES_BY_GENUS_QUERY,
        variables: { name: genus }
      })
      
      assertNoErrors(res)
      expect(res.data.genusSpecies).toBeDefined()
      assertSpeciesArray(res.data.genusSpecies, 1, true) // Use complete validation
    }
  })

  it('handles invalid genus names', async () => {
    for (const invalidGenus of testData.invalidNames) {
      if (invalidGenus === null || invalidGenus === undefined) {
        continue // Skip null/undefined which cause variables errors
      }
      
      const res = await executeOperation({
        query: GET_SPECIES_BY_GENUS_QUERY,
        variables: { name: invalidGenus }
      })
      
      // API returns errors for invalid genus names
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('Genus not found')
    }
  })
})

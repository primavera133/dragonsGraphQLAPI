const { createServer } = require('./__utils')
const { GET_SPECIES_BY_ID_QUERY } = require('./__queries')
const { assertNoErrors, assertSpeciesStructure, testData } = require('./__helpers')

describe('Species From ID - e2e', () => {
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

  it('gets species by valid ID', async () => {
    for (const id of testData.validSpeciesIds) {
      const res = await executeOperation({
        query: GET_SPECIES_BY_ID_QUERY,
        variables: { items_id: id }
      })
      
      assertNoErrors(res)
      expect(res.data.specieFromId).toBeDefined()
      assertSpeciesStructure(res.data.specieFromId, true) // Use complete validation
    }
  })

  it('handles invalid species IDs', async () => {
    for (const invalidId of testData.invalidIds) {
      if (invalidId === null || invalidId === undefined) {
        continue // Skip null/undefined which cause variables errors
      }
      
      const res = await executeOperation({
        query: GET_SPECIES_BY_ID_QUERY,
        variables: { items_id: invalidId }
      })
      
      // API returns errors for invalid species IDs
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('Specie not found')
    }
  })
})

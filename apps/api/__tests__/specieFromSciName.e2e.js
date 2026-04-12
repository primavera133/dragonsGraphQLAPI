const { createServer } = require('./__utils')
const { GET_SPECIES_BY_SCIENTIFIC_NAME_QUERY } = require('./__queries')
const { assertNoErrors, assertSpeciesStructure, testData } = require('./__helpers')

describe('Species From Scientific Name - e2e', () => {
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

  it('gets species by valid scientific name', async () => {
    for (const scientificName of testData.validScientificNames) {
      const res = await executeOperation({
        query: GET_SPECIES_BY_SCIENTIFIC_NAME_QUERY,
        variables: { scientific_name: scientificName }
      })
      
      assertNoErrors(res)
      expect(res.data.specieFromScientificName).toBeDefined()
      assertSpeciesStructure(res.data.specieFromScientificName, true) // Use complete validation
    }
  })

  it('handles invalid scientific names', async () => {
    for (const invalidName of testData.invalidNames) {
      if (invalidName === null || invalidName === undefined) {
        continue // Skip null/undefined which cause variables errors
      }
      
      const res = await executeOperation({
        query: GET_SPECIES_BY_SCIENTIFIC_NAME_QUERY,
        variables: { scientific_name: invalidName }
      })
      
      // API returns errors for invalid scientific names
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('Specie not found')
    }
  })
})

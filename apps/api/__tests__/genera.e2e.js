const { createServer } = require('./__utils')
const { GET_ALL_GENERA_QUERY } = require('./__queries')
const { assertNoErrors } = require('./__helpers')

describe('Genera - e2e', () => {
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

  it('gets list of all genera', async () => {
    const res = await executeOperation({
      query: GET_ALL_GENERA_QUERY
    })

    assertNoErrors(res)
    expect(res.data.genera).toBeDefined()
    expect(Array.isArray(res.data.genera)).toBe(true)
    expect(res.data.genera.length).toBeGreaterThan(0)
    
    // Verify each genus has the required structure
    res.data.genera.forEach(genus => {
      expect(genus).toHaveProperty('family_name')
      expect(genus).toHaveProperty('genus_name')
      expect(genus).toHaveProperty('species')
      expect(Array.isArray(genus.species)).toBe(true)
      
      // Verify species have scientific names
      genus.species.forEach(species => {
        expect(species).toHaveProperty('scientific_name')
        expect(typeof species.scientific_name).toBe('string')
      })
    })
  })
})

const { createServer } = require('./__utils')
const { GET_FAMILY_GENERA_QUERY } = require('./__queries')
const { assertNoErrors, testData } = require('./__helpers')

describe('Family Genera - e2e', () => {
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

  it('gets genera for each family', async () => {
    for (const family of testData.validFamilyNames) {
      const res = await executeOperation({
        query: GET_FAMILY_GENERA_QUERY,
        variables: { name: family }
      })
      
      assertNoErrors(res)
      expect(res.data.familyGenera).toBeDefined()
      expect(Array.isArray(res.data.familyGenera)).toBe(true)
      expect(res.data.familyGenera.length).toBeGreaterThan(0)
      
      // Verify each genus has required structure
      res.data.familyGenera.forEach(genus => {
        expect(genus).toHaveProperty('genus_name')
        expect(typeof genus.genus_name).toBe('string')
      })
    }
  })

  it('handles invalid family names', async () => {
    for (const invalidFamily of testData.invalidNames) {
      if (invalidFamily === null || invalidFamily === undefined) {
        continue // Skip null/undefined which cause variables errors
      }
      
      const res = await executeOperation({
        query: GET_FAMILY_GENERA_QUERY,
        variables: { name: invalidFamily }
      })
      
      // API returns errors for invalid family names
      expect(res.errors).toBeDefined()
      expect(res.errors[0].message).toContain('Family not found')
    }
  })
})

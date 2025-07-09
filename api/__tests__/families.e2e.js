const { createServer } = require('./__utils')
const { GET_ALL_FAMILIES_QUERY } = require('./__queries')
const { assertNoErrors } = require('./__helpers')

describe('Families - e2e', () => {
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

  it('gets list of all families', async () => {
    const res = await executeOperation({
      query: GET_ALL_FAMILIES_QUERY
    })

    assertNoErrors(res)
    expect(res.data.families).toBeDefined()
    expect(Array.isArray(res.data.families)).toBe(true)
    expect(res.data.families.length).toBeGreaterThan(0)
    
    // Verify each family has the required structure
    res.data.families.forEach(family => {
      expect(family).toHaveProperty('family_name')
      expect(typeof family.family_name).toBe('string')
      expect(family.family_name.length).toBeGreaterThan(0)
    })
  })
})

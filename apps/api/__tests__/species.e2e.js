const { createServer } = require('./__utils')
const { GET_ALL_SPECIES_QUERY } = require('./__queries')
const { assertNoErrors, assertSpeciesArray } = require('./__helpers')

describe('Species - e2e', () => {
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

  it('gets list of all species', async () => {
    const res = await executeOperation({
      query: GET_ALL_SPECIES_QUERY
    })

    assertNoErrors(res)
    expect(res.data.species).toBeDefined()
    assertSpeciesArray(res.data.species, 1, true) // Use complete validation
  })
})

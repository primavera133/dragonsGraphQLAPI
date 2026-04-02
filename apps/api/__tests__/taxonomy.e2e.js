const { createServer } = require('./__utils')
const { GET_TAXONOMY_QUERY } = require('./__queries')
const { assertNoErrors, assertValidScientificName } = require('./__helpers')

describe('Taxonomy - e2e', () => {
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

  it('gets complete taxonomic hierarchy', async () => {
    const res = await executeOperation({
      query: GET_TAXONOMY_QUERY
    })

    assertNoErrors(res)
    expect(res.data.taxonomy).toBeDefined()
    expect(res.data.taxonomy.families).toBeDefined()
    expect(Array.isArray(res.data.taxonomy.families)).toBe(true)
    expect(res.data.taxonomy.families.length).toBeGreaterThan(0)
    
    // Verify taxonomic structure
    res.data.taxonomy.families.forEach(family => {
      expect(family).toHaveProperty('family_name')
      expect(family).toHaveProperty('genera')
      expect(Array.isArray(family.genera)).toBe(true)
      
      family.genera.forEach(genus => {
        expect(genus).toHaveProperty('family_name')
        expect(genus).toHaveProperty('genus_name')
        expect(genus).toHaveProperty('species')
        expect(Array.isArray(genus.species)).toBe(true)
        
        // Verify family name consistency
        expect(genus.family_name).toBe(family.family_name)
        
        genus.species.forEach(species => {
          expect(species).toHaveProperty('items_id')
          expect(species).toHaveProperty('scientific_name')
          expect(species).toHaveProperty('local_names')
          expect(Array.isArray(species.local_names)).toBe(true)
          
          assertValidScientificName(species.scientific_name)
        })
      })
    })
  })
})

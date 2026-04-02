const { createServer } = require('./__utils')
const { GET_ABOUT_GENUS_QUERY } = require('./__queries')
const { assertNoErrors, testData } = require('./__helpers')

describe('About Genus - e2e', () => {
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

  it('gets genus information', async () => {
    for (const genus of testData.validGenusNames) {
      const res = await executeOperation({
        query: GET_ABOUT_GENUS_QUERY,
        variables: { name: genus }
      })
      
      assertNoErrors(res)
      expect(res.data.aboutGenus).toBeDefined()
      
      const genusInfo = res.data.aboutGenus
      expect(genusInfo).toHaveProperty('title')
      expect(genusInfo).toHaveProperty('author_citation')
      expect(genusInfo).toHaveProperty('description')
      expect(genusInfo).toHaveProperty('sources')
      expect(genusInfo).toHaveProperty('links')
      expect(genusInfo).toHaveProperty('meta')
      
      // Verify sources structure
      expect(Array.isArray(genusInfo.sources)).toBe(true)
      
      // Verify links structure
      expect(Array.isArray(genusInfo.links)).toBe(true)
      genusInfo.links.forEach(link => {
        expect(link).toHaveProperty('label')
        expect(link).toHaveProperty('link')
      })
      
      // Verify meta structure
      expect(Array.isArray(genusInfo.meta)).toBe(true)
      genusInfo.meta.forEach(meta => {
        expect(meta).toHaveProperty('label')
        expect(meta).toHaveProperty('value')
      })
    }
  })

  it('handles invalid genus names', async () => {
    for (const invalidGenus of testData.invalidNames) {
      if (invalidGenus === null || invalidGenus === undefined) {
        continue // Skip null/undefined which cause variables errors
      }
      
      const res = await executeOperation({
        query: GET_ABOUT_GENUS_QUERY,
        variables: { name: invalidGenus }
      })
      
      assertNoErrors(res)
      expect(res.data.aboutGenus).toBeNull()
    }
  })
})

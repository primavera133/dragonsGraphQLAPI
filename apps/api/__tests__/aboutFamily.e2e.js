const { createServer } = require('./__utils')
const { GET_ABOUT_FAMILY_QUERY } = require('./__queries')
const { assertNoErrors, testData } = require('./__helpers')

describe('About Family - e2e', () => {
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

  it('gets family information', async () => {
    for (const family of testData.validFamilyNames) {
      const res = await executeOperation({
        query: GET_ABOUT_FAMILY_QUERY,
        variables: { name: family }
      })
      
      assertNoErrors(res)
      expect(res.data.aboutFamily).toBeDefined()
      
      const familyInfo = res.data.aboutFamily
      expect(familyInfo).toHaveProperty('title')
      expect(familyInfo).toHaveProperty('author_citation')
      expect(familyInfo).toHaveProperty('description')
      expect(familyInfo).toHaveProperty('sources')
      expect(familyInfo).toHaveProperty('links')
      expect(familyInfo).toHaveProperty('meta')
      
      // Verify sources structure
      expect(Array.isArray(familyInfo.sources)).toBe(true)
      
      // Verify links structure
      expect(Array.isArray(familyInfo.links)).toBe(true)
      familyInfo.links.forEach(link => {
        expect(link).toHaveProperty('label')
        expect(link).toHaveProperty('link')
      })
      
      // Verify meta structure
      expect(Array.isArray(familyInfo.meta)).toBe(true)
      familyInfo.meta.forEach(meta => {
        expect(meta).toHaveProperty('label')
        expect(meta).toHaveProperty('value')
      })
    }
  })

  it('handles invalid family names', async () => {
    for (const invalidFamily of testData.invalidNames) {
      if (invalidFamily === null || invalidFamily === undefined) {
        continue // Skip null/undefined which cause variables errors
      }
      
      const res = await executeOperation({
        query: GET_ABOUT_FAMILY_QUERY,
        variables: { name: invalidFamily }
      })
      
      assertNoErrors(res)
      expect(res.data.aboutFamily).toBeNull()
    }
  })
})

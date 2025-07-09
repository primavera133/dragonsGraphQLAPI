const gql = require('graphql-tag')
const nock = require('nock')

const { createServer } = require('./__utils')

const GET_FULL_TAXONOMY_QUERY = gql`
  query {
    taxonomy {
      families {
        family_name
        genera {
          family_name
          genus_name
          species {
            items_id
            scientific_name
          }
        }
      }
    }
  }
`

describe('Taxonomy - e2e', () => {
  let server, executeOperation

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    server = testServer.server
    executeOperation = testServer.executeOperation
  })

  afterEach(async () => { if (server) { await server.stop() } })

  it('gets full taxonomy', async () => {
    const res = await executeOperation({
        query: GET_FULL_TAXONOMY_QUERY
      })

    expect(res.errors).toBeUndefined()
    expect(res.data.taxonomy).toBeDefined()
    expect(res.data.taxonomy.families[0].family_name).toBeDefined()
    expect(res.data.taxonomy.families[0].genera[0].genus_name).toBeDefined()
    expect(
      res.data.taxonomy.families[0].genera[0].species[0].scientific_name
    ).toBeDefined()
    expect(
      res.data.taxonomy.families[0].genera[0].species[0].items_id
    ).toBeDefined()
    expect(
      Object.keys(res.data.taxonomy.families[0].genera[0].species[0])
    ).toEqual(['items_id', 'scientific_name'])
  })
})

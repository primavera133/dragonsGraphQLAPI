const gql = require('graphql-tag')
const nock = require('nock')

const { createServer } = require('./__utils')

const GET_ALL_GENERA_QUERY = gql`
  query {
    genera {
      family_name
      genus_name
      species {
        scientific_name
      }
    }
  }
`

describe('Genera - e2e', () => {
  let server, executeOperation

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    server = testServer.server
    executeOperation = testServer.executeOperation
  })

  afterEach(async () => { if (server) { await server.stop() } })

  it('gets list of all genera', async () => {
    const res = await executeOperation({
      query: GET_ALL_GENERA_QUERY
    })

    expect(res.data.genera).toBeDefined()
    expect(Object.keys(res.data.genera[0])).toEqual([
      'family_name',
      'genus_name',
      'species'
    ])
  })
})

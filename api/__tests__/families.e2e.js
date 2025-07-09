const { createServer } = require('./__utils')
const gql = require('graphql-tag')
const nock = require('nock')

const GET_ALL_FAMILIES_QUERY = gql`
  query {
    families {
      family_name
    }
  }
`

describe('Families - e2e', () => {
  let server, executeOperation

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    server = testServer.server
    executeOperation = testServer.executeOperation
  })

  afterEach(async () => {
    await server.stop()
  })

  it('gets list of all families', async () => {
    const res = await executeOperation({
      query: GET_ALL_FAMILIES_QUERY
    })

    expect(res.data.families).toBeDefined()
    expect(Object.keys(res.data.families[0])).toEqual(['family_name'])
  })
})

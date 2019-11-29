const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_ALL_FAMILIES_QUERY = gql`
  query {
    families {
      family_name
    }
  }
`

describe('Families - e2e', () => {
  let service, graphql

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    service = testServer.service
    graphql = testServer.executeOperation
  })

  afterEach(() => service.close())

  it('gets list of all families', async () => {
    const res = await toPromise(
      graphql({
        query: GET_ALL_FAMILIES_QUERY
      })
    )

    expect(res.data.families).toBeDefined()
    expect(Object.keys(res.data.families[0])).toEqual(['family_name'])
  })
})

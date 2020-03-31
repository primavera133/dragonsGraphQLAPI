const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

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
  let service, graphql

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    service = testServer.service
    graphql = testServer.executeOperation
  })

  afterEach(() => service.close())

  it('gets list of all genera', async () => {
    const res = await toPromise(
      graphql({
        query: GET_ALL_GENERA_QUERY
      })
    )

    expect(res.data.genera).toBeDefined()
    expect(Object.keys(res.data.genera[0])).toEqual([
      'family_name',
      'genus_name',
      'species'
    ])
  })
})

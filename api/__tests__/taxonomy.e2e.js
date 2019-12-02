const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_FULL_TAXONOMY_QUERY = gql`
  query {
    taxonomy {
      families {
        family_name
        generas {
          genera_name
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
  let service, graphql

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    service = testServer.service
    graphql = testServer.executeOperation
  })

  afterEach(() => service.close())

  it('gets full taxonomy', async () => {
    const res = await toPromise(
      graphql({
        query: GET_FULL_TAXONOMY_QUERY
      })
    )

    expect(res.data.taxonomy).toBeDefined()
    expect(res.data.taxonomy.families[0].family_name).toBeDefined()
    expect(res.data.taxonomy.families[0].generas[0].genera_name).toBeDefined()
    expect(
      res.data.taxonomy.families[0].generas[0].species[0].scientific_name
    ).toBeDefined()
    expect(
      res.data.taxonomy.families[0].generas[0].species[0].items_id
    ).toBeDefined()
    expect(
      Object.keys(res.data.taxonomy.families[0].generas[0].species[0])
    ).toEqual(['items_id', 'scientific_name'])
  })
})

const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_SPECIE_FROM_ID_QUERY = gql`
  query specieFromId($items_id: ID!) {
    specieFromId(items_id: $items_id) {
      items_id
      scientific_name
      local_names
      behaviour
      description
      distribution
      habitat
      flight_period
      size {
        length
        wingspan
      }
      similar_species
      red_list {
        habitats_directive
        red_list_EU27
        red_list_europe
        red_list_mediterranean
        EU27_endemic
        red_list_europe_endemic
        trend_europe
      }
    }
  }
`

describe('Server - e2e: SpecieFromId', () => {
  let service, graphql

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    service = testServer.service
    graphql = testServer.executeOperation
  })

  afterEach(() => service.close())

  it('gets a specie from items_id', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIE_FROM_ID_QUERY,
        variables: { items_id: 'f2acd97bbac584258f1a680bf206653b' }
      })
    )
    expect(res).toMatchSnapshot()
  })
})

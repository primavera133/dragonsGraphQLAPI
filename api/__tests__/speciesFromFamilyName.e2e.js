const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_SPECIES_FROM_FAMILY_NAME_QUERY = gql`
  query familyFromName($name: String!) {
    familyFromName(name: $name) {
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

describe('Server - e2e: SpecieFromFamilyName', () => {
  let service, graphql

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    service = testServer.service
    graphql = testServer.executeOperation
  })

  afterEach(() => service.close())

  it('gets species from family name: Aeshnidae', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_FAMILY_NAME_QUERY,
        variables: { name: 'Aeshnidae' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from family name: Calopterygidae', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_FAMILY_NAME_QUERY,
        variables: { name: 'Calopterygidae' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from family name: Coenagrionidae', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_FAMILY_NAME_QUERY,
        variables: { name: 'Coenagrionidae' }
      })
    )
    expect(res).toMatchSnapshot()
  })
})

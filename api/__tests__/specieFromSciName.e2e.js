const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_SPECIE_FROM_SCIENTIFIC_NAME_QUERY = gql`
  query specieFromScientificName($scientific_name: String!) {
    specieFromScientificName(scientific_name: $scientific_name) {
      items_id
      scientific_name
      author_citation
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
      images {
        cloud_name
        all {
          public_id
          caption
          license
          lic_url
          by
          url
        }
      }
      sources
      links {
        label
        link
      }
    }
  }
`

describe('Server - e2e: SpecieFromScientificName', () => {
  let service, graphql

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    service = testServer.service
    graphql = testServer.executeOperation
  })

  afterEach(() => service.close())

  it('gets a specie from scientific_name', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIE_FROM_SCIENTIFIC_NAME_QUERY,
        variables: { scientific_name: 'Aeshna affinis' }
      })
    )
    expect(res).toMatchSnapshot()
  })
})

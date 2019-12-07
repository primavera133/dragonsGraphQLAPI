const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_ALL_SPECIES_QUERY = gql`
  query {
    species {
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
        cloudName
        all {
          publicId
          license
          lic_url
          by
          url
        }
      }
    }
  }
`

describe('Server - e2e', () => {
  let service, graphql

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    service = testServer.service
    graphql = testServer.executeOperation
  })

  afterEach(() => service.close())

  it('gets list of all species', async () => {
    const res = await toPromise(
      graphql({
        query: GET_ALL_SPECIES_QUERY
      })
    )

    expect(res.data.species).toBeDefined()
    expect(res.data.species[0].items_id).toBeDefined()
    expect(Object.keys(res.data.species[0])).toEqual([
      'items_id',
      'scientific_name',
      'author_citation',
      'local_names',
      'behaviour',
      'description',
      'distribution',
      'habitat',
      'flight_period',
      'size',
      'similar_species',
      'red_list',
      'images'
    ])
    expect(Object.keys(res.data.species[0].size)).toEqual([
      'length',
      'wingspan'
    ])
    expect(Object.keys(res.data.species[0].red_list)).toEqual([
      'habitats_directive',
      'red_list_EU27',
      'red_list_europe',
      'red_list_mediterranean',
      'EU27_endemic',
      'red_list_europe_endemic',
      'trend_europe'
    ])
    expect(Object.keys(res.data.species[0].images)).toEqual([
      'cloudName',
      'all'
    ])
    if (res.data.species[0].images.all[0]) {
      expect(Object.keys(res.data.species[0].images.all[0])).toEqual([
        'publicId',
        'license',
        'lic_url',
        'by',
        'url'
      ])
    }
  })
})

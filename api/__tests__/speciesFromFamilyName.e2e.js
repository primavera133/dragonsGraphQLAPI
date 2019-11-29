const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_SPECIES_FROM_FAMILY_NAME_QUERY = gql`
  query familySpecies($name: String!) {
    familySpecies(name: $name) {
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

  it('gets species from family names', async () => {
    const familiesToTest = [
      'Aeshnidae',
      'Calopterygidae',
      'Coenagrionidae',
      'Cordulegastridae',
      'Corduliidae',
      'Euphaeidae',
      'Gomphidae',
      'Incerta sedis',
      'Lestidae',
      'Libellulidae',
      'Macromiidae',
      'Platychnemididae'
    ]
    familiesToTest.forEach(async family => {
      const testServer = await createServer({
        path: '/graphql'
      })
      service = testServer.service
      graphql = testServer.executeOperation

      const res = await toPromise(
        graphql({
          query: GET_SPECIES_FROM_FAMILY_NAME_QUERY,
          variables: { name: family }
        })
      )
      expect(Object.keys(res.data.familySpecies[0])).toEqual([
        'items_id',
        'scientific_name',
        'local_names',
        'behaviour',
        'description',
        'distribution',
        'habitat',
        'flight_period',
        'size',
        'similar_species',
        'red_list'
      ])
      expect(Object.keys(res.data.familySpecies[0].size)).toEqual([
        'length',
        'wingspan'
      ])
      expect(Object.keys(res.data.familySpecies[0].red_list)).toEqual([
        'habitats_directive',
        'red_list_EU27',
        'red_list_europe',
        'red_list_mediterranean',
        'EU27_endemic',
        'red_list_europe_endemic',
        'trend_europe'
      ])
      service.close()
    })
  })
})

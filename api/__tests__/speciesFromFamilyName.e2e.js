const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_SPECIES_FROM_FAMILY_NAME_QUERY = gql`
  query familySpecies($name: String!) {
    familySpecies(name: $name) {
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
      meta {
        label
        value
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
      'incertae sedis',
      'Lestidae',
      'Libellulidae',
      'Macromiidae',
      'Platycnemididae'
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
      // console.log(222, res.data.familySpecies[0])
      expect(Object.keys(res.data.familySpecies[0])).toEqual([
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
        'images',
        'sources',
        'links',
        'meta'
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
      expect(Object.keys(res.data.familySpecies[0].images)).toEqual([
        'cloud_name',
        'all'
      ])
      // expect(Object.keys(res.data.familySpecies[0].images.all)).toEqual([
      //   'public_id',
      //   'caption',
      //   'license',
      //   'lic_url',
      //   'by',
      //   'url'
      // ])
      // console.log(7776, res.data.familySpecies[0].scientific_name)
      // console.log(7777, res.data.familySpecies[0].links)
      expect(Object.keys(res.data.familySpecies[0].links[0])).toEqual([
        'label',
        'link'
      ])

      expect(Object.keys(res.data.familySpecies[0].meta[0])).toEqual([
        'label',
        'value'
      ])

      service.close()
    })
  })
})

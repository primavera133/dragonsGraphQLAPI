const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_SPECIES_FROM_GENERA_NAME_QUERY = gql`
  query generaFromName($name: String!) {
    generaFromName(name: $name) {
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
describe('Server - e2e: speciesFromGeneraName no content', () => {
  it('gets species from genera names', async () => {
    const generasToTest = [
      'Aeshna',
      'Anax',
      'Boyeria',
      'Brachytron',
      'Caliaeschna',
      'Calopteryx',
      'Ceriagrion',
      'Coenagrion',
      'Enallagma',
      'Erythromma',
      'Cordulegaster',
      'Cordulia',
      'Epitheca',
      'Somatochlora',
      'Epallage',
      'Gomphus',
      'Lindenia',
      'Onychogomphus',
      'Paragomphus',
      'Oxygastra',
      'Chalcolestes',
      'Lestes',
      'Sympecma',
      'Brachythemis',
      'Crocothemis',
      'Diplacodes',
      'Leucorrhinia',
      'Libellula',
      'Orthetrum',
      'Pantala',
      'Selysiothemis',
      'Sympetrum',
      'Trithemis',
      'Zygonyx',
      'Macromia',
      'Platychnemis',
      'apor'
    ]
    generasToTest.forEach(async genera => {
      console.log(genera)
      const testServer = await createServer({
        path: '/graphql'
      })
      service = testServer.service
      graphql = testServer.executeOperation
      console.log(222)
      const res = await toPromise(
        graphql({
          query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
          variables: { name: genera }
        })
      )
      console.log(Object.keys(res.data.generaFromName[0]))
      expect(Object.keys(res.data.generaFromName[0])).toEqual([
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
      expect(Object.keys(res.data.generaFromName[0].size)).toEqual([
        'length',
        'wingspan'
      ])
      expect(Object.keys(res.data.generaFromName[0].red_list)).toEqual([
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

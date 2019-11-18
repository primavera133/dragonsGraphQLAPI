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
describe('Server - e2e: speciesFromGeneraName', () => {
  let service, graphql

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    service = testServer.service
    graphql = testServer.executeOperation
  })

  afterEach(() => service.close())

  function getQuery (name) {
    return {
      query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
      variables: { name }
    }
  }
  function expects (res) {
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
  }

  it('gets species from genera name: Aeshna', async () => {
    const res = await toPromise(graphql(getQuery('Aeshna')))
    expects(res)
  })

  it('gets species from genera name: Anax', async () => {
    const res = await toPromise(graphql(getQuery('Anax')))
    expects(res)
  })

  it('gets species from genera name: Boyeria', async () => {
    const res = await toPromise(graphql(getQuery('Boyeria')))
    expects(res)
  })

  it('gets species from genera name: Brachytron', async () => {
    const res = await toPromise(graphql(getQuery('Brachytron')))
    expects(res)
  })

  it('gets species from genera name: Caliaeschna', async () => {
    const res = await toPromise(graphql(getQuery('Caliaeschna')))
    expects(res)
  })

  it('gets species from genera name: Calopteryx', async () => {
    const res = await toPromise(graphql(getQuery('Calopteryx')))
    expects(res)
  })

  it('gets species from genera name: Ceriagrion', async () => {
    const res = await toPromise(graphql(getQuery('Ceriagrion')))
    expects(res)
  })

  it('gets species from genera name: Coenagrion', async () => {
    const res = await toPromise(graphql(getQuery('Coenagrion')))
    expects(res)
  })

  it('gets species from genera name: Enallagma', async () => {
    const res = await toPromise(graphql(getQuery('Enallagma')))
    expects(res)
  })

  it('gets species from genera name: Erythromma', async () => {
    const res = await toPromise(graphql(getQuery('Erythromma')))
    expects(res)
  })

  it('gets species from genera name: Cordulegaster', async () => {
    const res = await toPromise(graphql(getQuery('Cordulegaster')))
    expects(res)
  })
  it('gets species from genera name: Cordulia', async () => {
    const res = await toPromise(graphql(getQuery('Cordulia')))
    expects(res)
  })
  it('gets species from genera name: Epitheca', async () => {
    const res = await toPromise(graphql(getQuery('Epitheca')))
    expects(res)
  })
  it('gets species from genera name: Somatochlora', async () => {
    const res = await toPromise(graphql(getQuery('Somatochlora')))
    expects(res)
  })
  it('gets species from genera name: Epallage', async () => {
    const res = await toPromise(graphql(getQuery('Epallage')))
    expects(res)
  })
  it('gets species from genera name: Gomphus', async () => {
    const res = await toPromise(graphql(getQuery('Gomphus')))
    expects(res)
  })
  it('gets species from genera name: Lindenia', async () => {
    const res = await toPromise(graphql(getQuery('Lindenia')))
    expects(res)
  })
  it('gets species from genera name: Onychogomphus', async () => {
    const res = await toPromise(graphql(getQuery('Onychogomphus')))
    expects(res)
  })
  it('gets species from genera name: Paragomphus', async () => {
    const res = await toPromise(graphql(getQuery('Paragomphus')))
    expects(res)
  })
  it('gets species from genera name: Oxygastra', async () => {
    const res = await toPromise(graphql(getQuery('Oxygastra')))
    expects(res)
  })
  it('gets species from genera name: Chalcolestes', async () => {
    const res = await toPromise(graphql(getQuery('Chalcolestes')))
    expects(res)
  })
  it('gets species from genera name: Lestes', async () => {
    const res = await toPromise(graphql(getQuery('Lestes')))
    expects(res)
  })
  it('gets species from genera name: Sympecma', async () => {
    const res = await toPromise(graphql(getQuery('Sympecma')))
    expects(res)
  })
  it('gets species from genera name: Brachythemis', async () => {
    const res = await toPromise(graphql(getQuery('Brachythemis')))
    expects(res)
  })
  it('gets species from genera name:  Crocothemis', async () => {
    const res = await toPromise(graphql(getQuery('Crocothemis')))
    expects(res)
  })
  it('gets species from genera name: Diplacodes', async () => {
    const res = await toPromise(graphql(getQuery('Diplacodes')))
    expects(res)
  })
  it('gets species from genera name: Leucorrhinia', async () => {
    const res = await toPromise(graphql(getQuery('Leucorrhinia')))
    expects(res)
  })
  it('gets species from genera name: Libellula', async () => {
    const res = await toPromise(graphql(getQuery('Libellula')))
    expects(res)
  })
  it('gets species from genera name: Orthetrum', async () => {
    const res = await toPromise(graphql(getQuery('Orthetrum')))
    expects(res)
  })
  it('gets species from genera name: Pantala', async () => {
    const res = await toPromise(graphql(getQuery('Pantala')))
    expects(res)
  })
  it('gets species from genera name: Selysiothemis', async () => {
    const res = await toPromise(graphql(getQuery('Selysiothemis')))
    expects(res)
  })
  it('gets species from genera name: Sympetrum', async () => {
    const res = await toPromise(graphql(getQuery('Sympetrum')))
    expects(res)
  })
  it('gets species from genera name: Trithemis', async () => {
    const res = await toPromise(graphql(getQuery('Trithemis')))
    expects(res)
  })

  it('gets species from genera name: Zygonyx', async () => {
    const res = await toPromise(graphql(getQuery('Zygonyx')))
    expects(res)
  })
  it('gets species from genera name: Macromia', async () => {
    const res = await toPromise(graphql(getQuery('Macromia')))
    expects(res)
  })
  it('gets species from genera name: Platychnemis', async () => {
    const res = await toPromise(graphql(getQuery('Platychnemis')))
    expects(res)
  })
})

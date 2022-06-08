const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_SPECIES_FROM_GENERA_NAME_QUERY = gql`
  query genusSpecies($name: String!) {
    genusSpecies(name: $name) {
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
describe('Server - e2e: speciesFromGenusName', () => {
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
    expect(Object.keys(res.data.genusSpecies[0])).toEqual([
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
    expect(Object.keys(res.data.genusSpecies[0].size)).toEqual([
      'length',
      'wingspan'
    ])
    expect(Object.keys(res.data.genusSpecies[0].red_list)).toEqual([
      'habitats_directive',
      'red_list_EU27',
      'red_list_europe',
      'red_list_mediterranean',
      'EU27_endemic',
      'red_list_europe_endemic',
      'trend_europe'
    ])
    expect(Object.keys(res.data.genusSpecies[0].images)).toEqual([
      'cloud_name',
      'all'
    ])
    expect(Object.keys(res.data.genusSpecies[0].links[0])).toEqual([
      'label',
      'link'
    ])
    expect(Object.keys(res.data.genusSpecies[0].meta[0])).toEqual([
      'label',
      'value'
    ])
  }

  it('gets species from genus name: Aeshna', async () => {
    const res = await toPromise(graphql(getQuery('Aeshna')))
    expects(res)
  })

  it('gets species from genus name: Agriocnemis', async () => {
    const res = await toPromise(graphql(getQuery('Agriocnemis')))
    expects(res)
  })

  it('gets species from genus name: Anax', async () => {
    const res = await toPromise(graphql(getQuery('Anax')))
    expects(res)
  })

  it('gets species from genus name: Boyeria', async () => {
    const res = await toPromise(graphql(getQuery('Boyeria')))
    expects(res)
  })

  it('gets species from genus name: Brachytron', async () => {
    const res = await toPromise(graphql(getQuery('Brachytron')))
    expects(res)
  })

  it('gets species from genus name: Caliaeschna', async () => {
    const res = await toPromise(graphql(getQuery('Caliaeschna')))
    expects(res)
  })

  it('gets species from genus name: Calopteryx', async () => {
    const res = await toPromise(graphql(getQuery('Calopteryx')))
    expects(res)
  })

  it('gets species from genus name: Ceriagrion', async () => {
    const res = await toPromise(graphql(getQuery('Ceriagrion')))
    expects(res)
  })

  it('gets species from genus name: Coenagrion', async () => {
    const res = await toPromise(graphql(getQuery('Coenagrion')))
    expects(res)
  })

  it('gets species from genus name: Enallagma', async () => {
    const res = await toPromise(graphql(getQuery('Enallagma')))
    expects(res)
  })

  it('gets species from genus name: Erythromma', async () => {
    const res = await toPromise(graphql(getQuery('Erythromma')))
    expects(res)
  })

  it('gets species from genus name: Nehalennia', async () => {
    const res = await toPromise(graphql(getQuery('Nehalennia')))
    expects(res)
  })

  it('gets species from genus name: Pyrrhosoma', async () => {
    const res = await toPromise(graphql(getQuery('Pyrrhosoma')))
    expects(res)
  })

  it('gets species from genus name: Cordulegaster', async () => {
    const res = await toPromise(graphql(getQuery('Cordulegaster')))
    expects(res)
  })
  it('gets species from genus name: Cordulia', async () => {
    const res = await toPromise(graphql(getQuery('Cordulia')))
    expects(res)
  })
  it('gets species from genus name: Epitheca', async () => {
    const res = await toPromise(graphql(getQuery('Epitheca')))
    expects(res)
  })
  it('gets species from genus name: Somatochlora', async () => {
    const res = await toPromise(graphql(getQuery('Somatochlora')))
    expects(res)
  })
  it('gets species from genus name: Epallage', async () => {
    const res = await toPromise(graphql(getQuery('Epallage')))
    expects(res)
  })
  it('gets species from genus name: Gomphus', async () => {
    const res = await toPromise(graphql(getQuery('Gomphus')))
    expects(res)
  })
  it('gets species from genus name: Lindenia', async () => {
    const res = await toPromise(graphql(getQuery('Lindenia')))
    expects(res)
  })
  it('gets species from genus name: Onychogomphus', async () => {
    const res = await toPromise(graphql(getQuery('Onychogomphus')))
    expects(res)
  })
  it('gets species from genus name: Paragomphus', async () => {
    const res = await toPromise(graphql(getQuery('Paragomphus')))
    expects(res)
  })
  it('gets species from genus name: Oxygastra', async () => {
    const res = await toPromise(graphql(getQuery('Oxygastra')))
    expects(res)
  })
  it('gets species from genus name: Chalcolestes', async () => {
    const res = await toPromise(graphql(getQuery('Chalcolestes')))
    expects(res)
  })
  it('gets species from genus name: Lestes', async () => {
    const res = await toPromise(graphql(getQuery('Lestes')))
    expects(res)
  })
  it('gets species from genus name: Sympecma', async () => {
    const res = await toPromise(graphql(getQuery('Sympecma')))
    expects(res)
  })
  it('gets species from genus name: Brachythemis', async () => {
    const res = await toPromise(graphql(getQuery('Brachythemis')))
    expects(res)
  })
  it('gets species from genus name:  Crocothemis', async () => {
    const res = await toPromise(graphql(getQuery('Crocothemis')))
    expects(res)
  })
  it('gets species from genus name: Diplacodes', async () => {
    const res = await toPromise(graphql(getQuery('Diplacodes')))
    expects(res)
  })
  it('gets species from genus name: Leucorrhinia', async () => {
    const res = await toPromise(graphql(getQuery('Leucorrhinia')))
    expects(res)
  })
  it('gets species from genus name: Libellula', async () => {
    const res = await toPromise(graphql(getQuery('Libellula')))
    expects(res)
  })
  it('gets species from genus name: Orthetrum', async () => {
    const res = await toPromise(graphql(getQuery('Orthetrum')))
    expects(res)
  })
  it('gets species from genus name: Pantala', async () => {
    const res = await toPromise(graphql(getQuery('Pantala')))
    expects(res)
  })
  it('gets species from genus name: Selysiothemis', async () => {
    const res = await toPromise(graphql(getQuery('Selysiothemis')))
    expects(res)
  })
  it('gets species from genus name: Sympetrum', async () => {
    const res = await toPromise(graphql(getQuery('Sympetrum')))
    expects(res)
  })
  it('gets species from genus name: Trithemis', async () => {
    const res = await toPromise(graphql(getQuery('Trithemis')))
    expects(res)
  })

  it('gets species from genus name: Zygonyx', async () => {
    const res = await toPromise(graphql(getQuery('Zygonyx')))
    expects(res)
  })
  it('gets species from genus name: Macromia', async () => {
    const res = await toPromise(graphql(getQuery('Macromia')))
    expects(res)
  })
  it('gets species from genus name: Platycnemis', async () => {
    const res = await toPromise(graphql(getQuery('Platycnemis')))
    expects(res)
  })
})

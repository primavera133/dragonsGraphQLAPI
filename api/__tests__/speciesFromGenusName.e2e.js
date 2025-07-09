const gql = require('graphql-tag')
const nock = require('nock')

const { createServer } = require('./__utils')

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
  let server, executeOperation

  beforeEach(async () => {
    const testServer = await createServer({
      path: '/graphql'
    })
    server = testServer.server
    executeOperation = testServer.executeOperation
  })

  afterEach(async () => { if (server) { await server.stop() } })

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
    const res = await executeOperation(getQuery('Aeshna'))
    expect(res)
  })

  it('gets species from genus name: Agriocnemis', async () => {
    const res = await executeOperation(getQuery('Agriocnemis'))
    expect(res)
  })

  it('gets species from genus name: Anax', async () => {
    const res = await executeOperation(getQuery('Anax'))
    expect(res)
  })

  it('gets species from genus name: Boyeria', async () => {
    const res = await executeOperation(getQuery('Boyeria'))
    expect(res)
  })

  it('gets species from genus name: Brachytron', async () => {
    const res = await executeOperation(getQuery('Brachytron'))
    expect(res)
  })

  it('gets species from genus name: Caliaeschna', async () => {
    const res = await executeOperation(getQuery('Caliaeschna'))
    expect(res)
  })

  it('gets species from genus name: Calopteryx', async () => {
    const res = await executeOperation(getQuery('Calopteryx'))
    expect(res)
  })

  it('gets species from genus name: Ceriagrion', async () => {
    const res = await executeOperation(getQuery('Ceriagrion'))
    expect(res)
  })

  it('gets species from genus name: Coenagrion', async () => {
    const res = await executeOperation(getQuery('Coenagrion'))
    expect(res)
  })

  it('gets species from genus name: Enallagma', async () => {
    const res = await executeOperation(getQuery('Enallagma'))
    expect(res)
  })

  it('gets species from genus name: Erythromma', async () => {
    const res = await executeOperation(getQuery('Erythromma'))
    expect(res)
  })

  it('gets species from genus name: Nehalennia', async () => {
    const res = await executeOperation(getQuery('Nehalennia'))
    expect(res)
  })

  it('gets species from genus name: Pyrrhosoma', async () => {
    const res = await executeOperation(getQuery('Pyrrhosoma'))
    expect(res)
  })

  it('gets species from genus name: Cordulegaster', async () => {
    const res = await executeOperation(getQuery('Cordulegaster'))
    expect(res)
  })
  it('gets species from genus name: Cordulia', async () => {
    const res = await executeOperation(getQuery('Cordulia'))
    expect(res)
  })
  it('gets species from genus name: Epitheca', async () => {
    const res = await executeOperation(getQuery('Epitheca'))
    expect(res)
  })
  it('gets species from genus name: Somatochlora', async () => {
    const res = await executeOperation(getQuery('Somatochlora'))
    expect(res)
  })
  it('gets species from genus name: Epallage', async () => {
    const res = await executeOperation(getQuery('Epallage'))
    expect(res)
  })
  it('gets species from genus name: Gomphus', async () => {
    const res = await executeOperation(getQuery('Gomphus'))
    expect(res)
  })
  it('gets species from genus name: Lindenia', async () => {
    const res = await executeOperation(getQuery('Lindenia'))
    expect(res)
  })
  it('gets species from genus name: Onychogomphus', async () => {
    const res = await executeOperation(getQuery('Onychogomphus'))
    expect(res)
  })
  it('gets species from genus name: Paragomphus', async () => {
    const res = await executeOperation(getQuery('Paragomphus'))
    expect(res)
  })
  it('gets species from genus name: Oxygastra', async () => {
    const res = await executeOperation(getQuery('Oxygastra'))
    expect(res)
  })
  it('gets species from genus name: Chalcolestes', async () => {
    const res = await executeOperation(getQuery('Chalcolestes'))
    expect(res)
  })
  it('gets species from genus name: Lestes', async () => {
    const res = await executeOperation(getQuery('Lestes'))
    expect(res)
  })
  it('gets species from genus name: Sympecma', async () => {
    const res = await executeOperation(getQuery('Sympecma'))
    expect(res)
  })
  it('gets species from genus name: Brachythemis', async () => {
    const res = await executeOperation(getQuery('Brachythemis'))
    expect(res)
  })
  it('gets species from genus name:  Crocothemis', async () => {
    const res = await executeOperation(getQuery('Crocothemis'))
    expect(res)
  })
  it('gets species from genus name: Diplacodes', async () => {
    const res = await executeOperation(getQuery('Diplacodes'))
    expect(res)
  })
  it('gets species from genus name: Leucorrhinia', async () => {
    const res = await executeOperation(getQuery('Leucorrhinia'))
    expect(res)
  })
  it('gets species from genus name: Libellula', async () => {
    const res = await executeOperation(getQuery('Libellula'))
    expect(res)
  })
  it('gets species from genus name: Orthetrum', async () => {
    const res = await executeOperation(getQuery('Orthetrum'))
    expect(res)
  })
  it('gets species from genus name: Pantala', async () => {
    const res = await executeOperation(getQuery('Pantala'))
    expect(res)
  })
  it('gets species from genus name: Selysiothemis', async () => {
    const res = await executeOperation(getQuery('Selysiothemis'))
    expect(res)
  })
  it('gets species from genus name: Sympetrum', async () => {
    const res = await executeOperation(getQuery('Sympetrum'))
    expect(res)
  })
  it('gets species from genus name: Trithemis', async () => {
    const res = await executeOperation(getQuery('Trithemis'))
    expect(res)
  })

  it('gets species from genus name: Zygonyx', async () => {
    const res = await executeOperation(getQuery('Zygonyx'))
    expect(res)
  })
  it('gets species from genus name: Macromia', async () => {
    const res = await executeOperation(getQuery('Macromia'))
    expect(res)
  })
  it('gets species from genus name: Platycnemis', async () => {
    const res = await executeOperation(getQuery('Platycnemis'))
    expect(res)
  })
})

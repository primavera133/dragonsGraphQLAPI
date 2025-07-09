const gql = require('graphql-tag')
const nock = require('nock')

const { createServer } = require('./__utils')

const GET_INFO_ABOUT_GENUS_FROM_NAME_QUERY = gql`
  query aboutGenus($name: String!) {
    aboutGenus(name: $name) {
      title
      author_citation
      description
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
describe('Server - e2e: aboutGenus', () => {
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
      query: GET_INFO_ABOUT_GENUS_FROM_NAME_QUERY,
      variables: { name }
    }
  }
  function expects (res) {
    expect(Object.keys(res.data.aboutGenus)).toEqual([
      'title',
      'author_citation',
      'description',
      'sources',
      'links',
      'meta'
    ])

    expect(Object.keys(res.data.aboutGenus.links[0])).toEqual(['label', 'link'])

    expect(Object.keys(res.data.aboutGenus.meta[0])).toEqual(['label', 'value'])
  }

  it('gets info about genus: Aeshna', async () => {
    const res = await executeOperation(getQuery('Aeshna'))
    expect(res)
  })

  it('gets info about genus: Agriocnemis', async () => {
    const res = await executeOperation(getQuery('Agriocnemis'))
    expect(res)
  })

  it('gets info about genus: Anax', async () => {
    const res = await executeOperation(getQuery('Anax'))
    expect(res)
  })

  it('gets info about genus: Boyeria', async () => {
    const res = await executeOperation(getQuery('Boyeria'))
    expect(res)
  })

  it('gets info about genus: Brachytron', async () => {
    const res = await executeOperation(getQuery('Brachytron'))
    expect(res)
  })

  it('gets info about genus: Caliaeschna', async () => {
    const res = await executeOperation(getQuery('Caliaeschna'))
    expect(res)
  })

  it('gets info about genus: Calopteryx', async () => {
    const res = await executeOperation(getQuery('Calopteryx'))
    expect(res)
  })

  it('gets info about genus: Ceriagrion', async () => {
    const res = await executeOperation(getQuery('Ceriagrion'))
    expect(res)
  })

  it('gets info about genus: Coenagrion', async () => {
    const res = await executeOperation(getQuery('Coenagrion'))
    expect(res)
  })

  it('gets info about genus: Enallagma', async () => {
    const res = await executeOperation(getQuery('Enallagma'))
    expect(res)
  })

  it('gets info about genus: Erythromma', async () => {
    const res = await executeOperation(getQuery('Erythromma'))
    expect(res)
  })

  it('gets info about genus: Nehalennia', async () => {
    const res = await executeOperation(getQuery('Nehalennia'))
    expect(res)
  })

  it('gets info about genus: Pyrrhosoma', async () => {
    const res = await executeOperation(getQuery('Pyrrhosoma'))
    expect(res)
  })

  it('gets info about genus: Cordulegaster', async () => {
    const res = await executeOperation(getQuery('Cordulegaster'))
    expect(res)
  })
  it('gets info about genus: Cordulia', async () => {
    const res = await executeOperation(getQuery('Cordulia'))
    expect(res)
  })
  it('gets info about genus: Epitheca', async () => {
    const res = await executeOperation(getQuery('Epitheca'))
    expect(res)
  })
  it('gets info about genus: Somatochlora', async () => {
    const res = await executeOperation(getQuery('Somatochlora'))
    expect(res)
  })
  it('gets info about genus: Epallage', async () => {
    const res = await executeOperation(getQuery('Epallage'))
    expect(res)
  })
  it('gets info about genus: Gomphus', async () => {
    const res = await executeOperation(getQuery('Gomphus'))
    expect(res)
  })
  it('gets info about genus: Lindenia', async () => {
    const res = await executeOperation(getQuery('Lindenia'))
    expect(res)
  })
  it('gets info about genus: Onychogomphus', async () => {
    const res = await executeOperation(getQuery('Onychogomphus'))
    expect(res)
  })
  it('gets info about genus: Paragomphus', async () => {
    const res = await executeOperation(getQuery('Paragomphus'))
    expect(res)
  })
  it('gets info about genus: Oxygastra', async () => {
    const res = await executeOperation(getQuery('Oxygastra'))
    expect(res)
  })
  it('gets info about genus: Chalcolestes', async () => {
    const res = await executeOperation(getQuery('Chalcolestes'))
    expect(res)
  })
  it('gets info about genus: Lestes', async () => {
    const res = await executeOperation(getQuery('Lestes'))
    expect(res)
  })
  it('gets info about genus: Sympecma', async () => {
    const res = await executeOperation(getQuery('Sympecma'))
    expect(res)
  })
  it('gets info about genus: Brachythemis', async () => {
    const res = await executeOperation(getQuery('Brachythemis'))
    expect(res)
  })
  it('gets info about genus:  Crocothemis', async () => {
    const res = await executeOperation(getQuery('Crocothemis'))
    expect(res)
  })
  it('gets info about genus: Diplacodes', async () => {
    const res = await executeOperation(getQuery('Diplacodes'))
    expect(res)
  })
  it('gets info about genus: Leucorrhinia', async () => {
    const res = await executeOperation(getQuery('Leucorrhinia'))
    expect(res)
  })
  it('gets info about genus: Libellula', async () => {
    const res = await executeOperation(getQuery('Libellula'))
    expect(res)
  })
  it('gets info about genus: Orthetrum', async () => {
    const res = await executeOperation(getQuery('Orthetrum'))
    expect(res)
  })
  it('gets info about genus: Pantala', async () => {
    const res = await executeOperation(getQuery('Pantala'))
    expect(res)
  })
  it('gets info about genus: Selysiothemis', async () => {
    const res = await executeOperation(getQuery('Selysiothemis'))
    expect(res)
  })
  it('gets info about genus: Sympetrum', async () => {
    const res = await executeOperation(getQuery('Sympetrum'))
    expect(res)
  })
  it('gets info about genus: Trithemis', async () => {
    const res = await executeOperation(getQuery('Trithemis'))
    expect(res)
  })

  it('gets info about genus: Zygonyx', async () => {
    const res = await executeOperation(getQuery('Zygonyx'))
    expect(res)
  })
  it('gets info about genus: Macromia', async () => {
    const res = await executeOperation(getQuery('Macromia'))
    expect(res)
  })
  it('gets info about genus: Platycnemis', async () => {
    const res = await executeOperation(getQuery('Platycnemis'))
    expect(res)
  })
})

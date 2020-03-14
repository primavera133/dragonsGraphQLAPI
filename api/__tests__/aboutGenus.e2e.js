const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_INFO_ABOUT_GENUS_FROM_NAME_QUERY = gql`
  query aboutGenus($name: String!) {
    aboutGenus(name: $name) {
      title
    }
  }
`
describe('Server - e2e: aboutGenus', () => {
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
      query: GET_INFO_ABOUT_GENUS_FROM_NAME_QUERY,
      variables: { name }
    }
  }
  function expects (res) {
    expect(Object.keys(res.data.aboutGenus)).toEqual(['title'])
  }

  it('gets info about genus: Aeshna', async () => {
    const res = await toPromise(graphql(getQuery('Aeshna')))
    expects(res)
  })

  it('gets info about genus: Anax', async () => {
    const res = await toPromise(graphql(getQuery('Anax')))
    expects(res)
  })

  it('gets info about genus: Boyeria', async () => {
    const res = await toPromise(graphql(getQuery('Boyeria')))
    expects(res)
  })

  it('gets info about genus: Brachytron', async () => {
    const res = await toPromise(graphql(getQuery('Brachytron')))
    expects(res)
  })

  it('gets info about genus: Caliaeschna', async () => {
    const res = await toPromise(graphql(getQuery('Caliaeschna')))
    expects(res)
  })

  it('gets info about genus: Calopteryx', async () => {
    const res = await toPromise(graphql(getQuery('Calopteryx')))
    expects(res)
  })

  it('gets info about genus: Ceriagrion', async () => {
    const res = await toPromise(graphql(getQuery('Ceriagrion')))
    expects(res)
  })

  it('gets info about genus: Coenagrion', async () => {
    const res = await toPromise(graphql(getQuery('Coenagrion')))
    expects(res)
  })

  it('gets info about genus: Enallagma', async () => {
    const res = await toPromise(graphql(getQuery('Enallagma')))
    expects(res)
  })

  it('gets info about genus: Erythromma', async () => {
    const res = await toPromise(graphql(getQuery('Erythromma')))
    expects(res)
  })

  it('gets info about genus: Nehalennia', async () => {
    const res = await toPromise(graphql(getQuery('Nehalennia')))
    expects(res)
  })

  it('gets info about genus: Pyrrhosoma', async () => {
    const res = await toPromise(graphql(getQuery('Pyrrhosoma')))
    expects(res)
  })

  it('gets info about genus: Cordulegaster', async () => {
    const res = await toPromise(graphql(getQuery('Cordulegaster')))
    expects(res)
  })
  it('gets info about genus: Cordulia', async () => {
    const res = await toPromise(graphql(getQuery('Cordulia')))
    expects(res)
  })
  it('gets info about genus: Epitheca', async () => {
    const res = await toPromise(graphql(getQuery('Epitheca')))
    expects(res)
  })
  it('gets info about genus: Somatochlora', async () => {
    const res = await toPromise(graphql(getQuery('Somatochlora')))
    expects(res)
  })
  it('gets info about genus: Epallage', async () => {
    const res = await toPromise(graphql(getQuery('Epallage')))
    expects(res)
  })
  it('gets info about genus: Gomphus', async () => {
    const res = await toPromise(graphql(getQuery('Gomphus')))
    expects(res)
  })
  it('gets info about genus: Lindenia', async () => {
    const res = await toPromise(graphql(getQuery('Lindenia')))
    expects(res)
  })
  it('gets info about genus: Onychogomphus', async () => {
    const res = await toPromise(graphql(getQuery('Onychogomphus')))
    expects(res)
  })
  it('gets info about genus: Paragomphus', async () => {
    const res = await toPromise(graphql(getQuery('Paragomphus')))
    expects(res)
  })
  it('gets info about genus: Oxygastra', async () => {
    const res = await toPromise(graphql(getQuery('Oxygastra')))
    expects(res)
  })
  it('gets info about genus: Chalcolestes', async () => {
    const res = await toPromise(graphql(getQuery('Chalcolestes')))
    expects(res)
  })
  it('gets info about genus: Lestes', async () => {
    const res = await toPromise(graphql(getQuery('Lestes')))
    expects(res)
  })
  it('gets info about genus: Sympecma', async () => {
    const res = await toPromise(graphql(getQuery('Sympecma')))
    expects(res)
  })
  it('gets info about genus: Brachythemis', async () => {
    const res = await toPromise(graphql(getQuery('Brachythemis')))
    expects(res)
  })
  it('gets info about genus:  Crocothemis', async () => {
    const res = await toPromise(graphql(getQuery('Crocothemis')))
    expects(res)
  })
  it('gets info about genus: Diplacodes', async () => {
    const res = await toPromise(graphql(getQuery('Diplacodes')))
    expects(res)
  })
  it('gets info about genus: Leucorrhinia', async () => {
    const res = await toPromise(graphql(getQuery('Leucorrhinia')))
    expects(res)
  })
  it('gets info about genus: Libellula', async () => {
    const res = await toPromise(graphql(getQuery('Libellula')))
    expects(res)
  })
  it('gets info about genus: Orthetrum', async () => {
    const res = await toPromise(graphql(getQuery('Orthetrum')))
    expects(res)
  })
  it('gets info about genus: Pantala', async () => {
    const res = await toPromise(graphql(getQuery('Pantala')))
    expects(res)
  })
  it('gets info about genus: Selysiothemis', async () => {
    const res = await toPromise(graphql(getQuery('Selysiothemis')))
    expects(res)
  })
  it('gets info about genus: Sympetrum', async () => {
    const res = await toPromise(graphql(getQuery('Sympetrum')))
    expects(res)
  })
  it('gets info about genus: Trithemis', async () => {
    const res = await toPromise(graphql(getQuery('Trithemis')))
    expects(res)
  })

  it('gets info about genus: Zygonyx', async () => {
    const res = await toPromise(graphql(getQuery('Zygonyx')))
    expects(res)
  })
  it('gets info about genus: Macromia', async () => {
    const res = await toPromise(graphql(getQuery('Macromia')))
    expects(res)
  })
  it('gets info about genus: Platycnemis', async () => {
    const res = await toPromise(graphql(getQuery('Platycnemis')))
    expects(res)
  })
})

const gql = require('graphql-tag')
const nock = require('nock')

const { createServer } = require('./__utils')

const GET_INFO_ABOUT_FAMILY_FROM_NAME_QUERY = gql`
  query aboutFamily($name: String!) {
    aboutFamily(name: $name) {
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
describe('Server - e2e: aboutFamily', () => {
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
      query: GET_INFO_ABOUT_FAMILY_FROM_NAME_QUERY,
      variables: { name }
    }
  }
  function expects (res) {
    expect(Object.keys(res.data.aboutFamily)).toEqual([
      'title',
      'author_citation',
      'description',
      'sources',
      'links',
      'meta'
    ])

    expect(Object.keys(res.data.aboutFamily.links[0])).toEqual([
      'label',
      'link'
    ])

    expect(Object.keys(res.data.aboutFamily.meta[0])).toEqual([
      'label',
      'value'
    ])
  }

  it('gets info about family: Aeshnidae', async () => {
    const res = await executeOperation(getQuery('Aeshnidae'))
    expect(res)
  })

  it('gets info about family: calopterygidae', async () => {
    const res = await executeOperation(getQuery('calopterygidae'))
    expect(res)
  })
  it('gets info about family: coenagrionidae', async () => {
    const res = await executeOperation(getQuery('coenagrionidae'))
    expect(res)
  })
  it('gets info about family: cordulegastridae', async () => {
    const res = await executeOperation(getQuery('cordulegastridae'))
    expect(res)
  })
  it('gets info about family: corduliidae', async () => {
    const res = await executeOperation(getQuery('corduliidae'))
    expect(res)
  })
  it('gets info about family: euphaeidae', async () => {
    const res = await executeOperation(getQuery('euphaeidae'))
    expect(res)
  })
  it('gets info about family: gomphidae', async () => {
    const res = await executeOperation(getQuery('gomphidae'))
    expect(res)
  })
  it('gets info about family: incertae sedis', async () => {
    const res = await executeOperation(getQuery('incertae sedis'))
    expect(res)
  })
  it('gets info about family: lestidae', async () => {
    const res = await executeOperation(getQuery('lestidae'))
    expect(res)
  })
  it('gets info about family: libellulidae', async () => {
    const res = await executeOperation(getQuery('libellulidae'))
    expect(res)
  })
  it('gets info about family: macromiidae', async () => {
    const res = await executeOperation(getQuery('macromiidae'))
    expect(res)
  })
  it('gets info about family: platycnemididae', async () => {
    const res = await executeOperation(getQuery('platycnemididae'))
    expect(res)
  })
})

const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_INFO_ABOUT_FAMILY_FROM_NAME_QUERY = gql`
  query aboutFamily($name: String!) {
    aboutFamily(name: $name) {
      title
      author_citation
      description
      sources
    }
  }
`
describe('Server - e2e: aboutFamily', () => {
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
      query: GET_INFO_ABOUT_FAMILY_FROM_NAME_QUERY,
      variables: { name }
    }
  }
  function expects (res) {
    expect(Object.keys(res.data.aboutFamily)).toEqual([
      'title',
      'author_citation',
      'description',
      'sources'
    ])
  }

  it('gets info about family: Aeshnidae', async () => {
    const res = await toPromise(graphql(getQuery('Aeshnidae')))
    expects(res)
  })

  it('gets info about family: calopterygidae', async () => {
    const res = await toPromise(graphql(getQuery('calopterygidae')))
    expects(res)
  })
  it('gets info about family: coenagrionidae', async () => {
    const res = await toPromise(graphql(getQuery('coenagrionidae')))
    expects(res)
  })
  it('gets info about family: cordulegastridae', async () => {
    const res = await toPromise(graphql(getQuery('cordulegastridae')))
    expects(res)
  })
  it('gets info about family: corduliidae', async () => {
    const res = await toPromise(graphql(getQuery('corduliidae')))
    expects(res)
  })
  it('gets info about family: euphaeidae', async () => {
    const res = await toPromise(graphql(getQuery('euphaeidae')))
    expects(res)
  })
  it('gets info about family: gomphidae', async () => {
    const res = await toPromise(graphql(getQuery('gomphidae')))
    expects(res)
  })
  it('gets info about family: incertae sedis', async () => {
    const res = await toPromise(graphql(getQuery('incertae sedis')))
    expects(res)
  })
  it('gets info about family: lestidae', async () => {
    const res = await toPromise(graphql(getQuery('lestidae')))
    expects(res)
  })
  it('gets info about family: libellulidae', async () => {
    const res = await toPromise(graphql(getQuery('libellulidae')))
    expects(res)
  })
  it('gets info about family: macromiidae', async () => {
    const res = await toPromise(graphql(getQuery('macromiidae')))
    expects(res)
  })
  it('gets info about family: platycnemididae', async () => {
    const res = await toPromise(graphql(getQuery('platycnemididae')))
    expects(res)
  })
})

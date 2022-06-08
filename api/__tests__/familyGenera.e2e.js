const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_GENUS_NAME_FROM_FAMILY_NAME_QUERY = gql`
  query familyGenera($name: String!) {
    familyGenera(name: $name) {
      genus_name
    }
  }
`
describe('Server - e2e: familyGenera', () => {
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
      query: GET_GENUS_NAME_FROM_FAMILY_NAME_QUERY,
      variables: { name }
    }
  }
  function expects (res) {
    expect(Object.keys(res.data.familyGenera[0])).toEqual(['genus_name'])
  }

  it('gets genus names from family name: Aeshnidae', async () => {
    const res = await toPromise(graphql(getQuery('Aeshnidae')))
    expect(res.data.familyGenera).toEqual(
      ['aeshna', 'anax', 'boyeria', 'brachytron', 'caliaeschna'].map(
        genus_name => ({ genus_name })
      )
    )
  })

  it('gets genus names from family name: Calopterygidae', async () => {
    const res = await toPromise(graphql(getQuery('Calopterygidae')))
    expect(res.data.familyGenera).toEqual(
      ['calopteryx'].map(genus_name => ({ genus_name }))
    )
  })

  it('gets genus names from family name: Coenagrionidae', async () => {
    const res = await toPromise(graphql(getQuery('Coenagrionidae')))
    expect(res.data.familyGenera).toEqual(
      [
        'agriocnemis',
        'ceriagrion',
        'coenagrion',
        'enallagma',
        'erythromma',
        'ischnura',
        'nehalennia',
        'pyrrhosoma'
      ].map(genus_name => ({ genus_name }))
    )
  })

  it('gets genus names from family name: Cordulegastridae', async () => {
    const res = await toPromise(graphql(getQuery('Cordulegastridae')))
    expect(res.data.familyGenera).toEqual(
      ['cordulegaster'].map(genus_name => ({ genus_name }))
    )
  })

  it('gets genus names from family name: Corduliidae', async () => {
    const res = await toPromise(graphql(getQuery('Corduliidae')))
    expect(res.data.familyGenera).toEqual(
      ['cordulia', 'epitheca', 'somatochlora'].map(genus_name => ({
        genus_name
      }))
    )
  })

  it('gets genus names from family name: Euphaeidae', async () => {
    const res = await toPromise(graphql(getQuery('Euphaeidae')))
    expect(res.data.familyGenera).toEqual(
      ['epallage'].map(genus_name => ({
        genus_name
      }))
    )
  })

  it('gets genus names from family name: Gomphidae', async () => {
    const res = await toPromise(graphql(getQuery('Gomphidae')))
    expect(res.data.familyGenera).toEqual(
      [
        'gomphus',
        'lindenia',
        'onychogomphus',
        'ophiogomphus',
        'paragomphus',
        'stylurus'
      ].map(genus_name => ({
        genus_name
      }))
    )
  })

  it('gets genus names from family name: incertae sedis', async () => {
    const res = await toPromise(graphql(getQuery('incertae sedis')))
    expect(res.data.familyGenera).toEqual(
      ['oxygastra'].map(genus_name => ({
        genus_name
      }))
    )
  })

  it('gets genus names from family name: Lestidae', async () => {
    const res = await toPromise(graphql(getQuery('Lestidae')))
    expect(res.data.familyGenera).toEqual(
      ['chalcolestes', 'lestes', 'sympecma'].map(genus_name => ({
        genus_name
      }))
    )
  })

  it('gets genus names from family name: Libellulidae', async () => {
    const res = await toPromise(graphql(getQuery('Libellulidae')))
    expect(res.data.familyGenera).toEqual(
      [
        'brachythemis',
        'crocothemis',
        'diplacodes',
        'leucorrhinia',
        'libellula',
        'orthetrum',
        'pantala',
        'selysiothemis',
        'sympetrum',
        'trithemis',
        'zygonyx'
      ].map(genus_name => ({
        genus_name
      }))
    )
  })

  it('gets genus names from family name: Macromiidae', async () => {
    const res = await toPromise(graphql(getQuery('Macromiidae')))
    expect(res.data.familyGenera).toEqual(
      ['macromia'].map(genus_name => ({
        genus_name
      }))
    )
  })

  it('gets genus names from family name: Platycnemididae', async () => {
    const res = await toPromise(graphql(getQuery('Platycnemididae')))
    expect(res.data.familyGenera).toEqual(
      ['platycnemis'].map(genus_name => ({
        genus_name
      }))
    )
  })
})

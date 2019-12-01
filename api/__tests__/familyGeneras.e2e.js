const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const nock = require('nock')

const { createServer, toPromise } = require('./__utils')

const GET_GENERA_NAME_FROM_FAMILY_NAME_QUERY = gql`
  query familyGeneras($name: String!) {
    familyGeneras(name: $name) {
      genera_name
    }
  }
`
describe('Server - e2e: familyGeneras', () => {
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
      query: GET_GENERA_NAME_FROM_FAMILY_NAME_QUERY,
      variables: { name }
    }
  }
  function expects (res) {
    expect(Object.keys(res.data.familyGeneras[0])).toEqual(['genera_name'])
  }

  it('gets genera names from family name: Aeshnidae', async () => {
    const res = await toPromise(graphql(getQuery('Aeshnidae')))
    expect(res.data.familyGeneras).toEqual(
      ['aeshna', 'anax', 'boyeria', 'brachytron', 'caliaeschna'].map(
        genera_name => ({ genera_name })
      )
    )
  })

  it('gets genera names from family name: Calopterygidae', async () => {
    const res = await toPromise(graphql(getQuery('Calopterygidae')))
    expect(res.data.familyGeneras).toEqual(
      ['calopteryx'].map(genera_name => ({ genera_name }))
    )
  })

  it('gets genera names from family name: Coenagrionidae', async () => {
    const res = await toPromise(graphql(getQuery('Coenagrionidae')))
    expect(res.data.familyGeneras).toEqual(
      ['ceriagrion', 'coenagrion', 'enallagma', 'erythromma'].map(
        genera_name => ({ genera_name })
      )
    )
  })

  it('gets genera names from family name: Cordulegastridae', async () => {
    const res = await toPromise(graphql(getQuery('Cordulegastridae')))
    expect(res.data.familyGeneras).toEqual(
      ['cordulegaster'].map(genera_name => ({ genera_name }))
    )
  })

  it('gets genera names from family name: Corduliidae', async () => {
    const res = await toPromise(graphql(getQuery('Corduliidae')))
    expect(res.data.familyGeneras).toEqual(
      ['cordulia', 'epitheca', 'somatochlora'].map(genera_name => ({
        genera_name
      }))
    )
  })

  it('gets genera names from family name: Euphaeidae', async () => {
    const res = await toPromise(graphql(getQuery('Euphaeidae')))
    expect(res.data.familyGeneras).toEqual(
      ['epallage'].map(genera_name => ({
        genera_name
      }))
    )
  })

  it('gets genera names from family name: Gomphidae', async () => {
    const res = await toPromise(graphql(getQuery('Gomphidae')))
    expect(res.data.familyGeneras).toEqual(
      [
        'gomphus',
        'lindenia',
        'onychogomphus',
        'ophiogomphus',
        'paragomphus'
      ].map(genera_name => ({
        genera_name
      }))
    )
  })

  it('gets genera names from family name: Incerta sedis', async () => {
    const res = await toPromise(graphql(getQuery('Incerta sedis')))
    expect(res.data.familyGeneras).toEqual(
      ['oxygastra'].map(genera_name => ({
        genera_name
      }))
    )
  })

  it('gets genera names from family name: Lestidae', async () => {
    const res = await toPromise(graphql(getQuery('Lestidae')))
    expect(res.data.familyGeneras).toEqual(
      ['chalcolestes', 'lestes', 'sympecma'].map(genera_name => ({
        genera_name
      }))
    )
  })

  it('gets genera names from family name: Libellulidae', async () => {
    const res = await toPromise(graphql(getQuery('Libellulidae')))
    expect(res.data.familyGeneras).toEqual(
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
      ].map(genera_name => ({
        genera_name
      }))
    )
  })

  it('gets genera names from family name: Macromiidae', async () => {
    const res = await toPromise(graphql(getQuery('Macromiidae')))
    expect(res.data.familyGeneras).toEqual(
      ['macromia'].map(genera_name => ({
        genera_name
      }))
    )
  })

  it('gets genera names from family name: Platycnemididae', async () => {
    const res = await toPromise(graphql(getQuery('Platycnemididae')))
    expect(res.data.familyGeneras).toEqual(
      ['platycnemis'].map(genera_name => ({
        genera_name
      }))
    )
  })
})

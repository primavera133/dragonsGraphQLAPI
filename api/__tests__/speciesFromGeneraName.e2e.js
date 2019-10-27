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

  it('gets species from genera name: Aeshna', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Aeshna' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from genera name: Anax', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Anax' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from genera name: Boyeria', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Boyeria' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from genera name: Brachytron', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Brachytron' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from genera name: Caliaeschna', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Caliaeschna' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from genera name: Calopteryx', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Calopteryx' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from genera name: Ceriagrion', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Ceriagrion' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from genera name: Coenagrion', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Coenagrion' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from genera name: Enallagma', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Enallagma' }
      })
    )
    expect(res).toMatchSnapshot()
  })

  it('gets species from genera name: Erythromma', async () => {
    const res = await toPromise(
      graphql({
        query: GET_SPECIES_FROM_GENERA_NAME_QUERY,
        variables: { name: 'Erythromma' }
      })
    )
    expect(res).toMatchSnapshot()
  })
})

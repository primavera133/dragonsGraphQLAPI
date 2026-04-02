const allGenera = require('./allGenera')
const species = require('../_data/index')

describe('test allGenera', () => {
  it('should return something smooth', () => {
    const ag = allGenera(species)
    expect(Array.isArray(ag)).toBe(true)
  })
})

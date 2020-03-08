const { DataSource } = require('apollo-datasource')
const { ApolloError } = require('apollo-server-micro')

class GenusAPI extends DataSource {
  constructor ({ store }) {
    super()
    this.store = store
  }

  initialize (config) {
    this.context = config.context
  }

  aboutGenus (name) {
    const _name = name.toLowerCase()
    return this.store.genera[_name]
  }
}

module.exports = GenusAPI
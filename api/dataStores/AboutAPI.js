const { DataSource } = require('apollo-datasource')
const { ApolloError } = require('apollo-server-micro')

class AboutAPI extends DataSource {
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

  aboutFamily (name) {
    const _name = name.toLowerCase()
    return this.store.families[_name]
  }
}

module.exports = AboutAPI

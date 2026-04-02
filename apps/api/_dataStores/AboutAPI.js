const { GraphQLError } = require('graphql')

class AboutAPI {
  constructor ({ store }) {
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
    const _name = name.toLowerCase().replace(' ', '_')
    return this.store.families[_name]
  }
}

module.exports = AboutAPI

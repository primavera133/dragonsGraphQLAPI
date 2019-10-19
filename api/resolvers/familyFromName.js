const species = require('../data/index.js')

const familyFromNameResolver = (parent, { name }) => {
    const family = species[name.toLowerCase()]
    if (!family) return new ApolloError(`Family not found: ${name}`)

    return Object.values(family).reduce(
        (acc, genera) => acc.concat(genera),
        []
    )
}

module.exports = familyFromNameResolver

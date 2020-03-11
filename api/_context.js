const { ApolloError } = require('apollo-server-micro')

const context = ({ req }) => {
  const token = (req.headers && req.headers.authorization) || ''
  const users = process.env.API_USERS || ''
  const usersArr = users.split(' ')

  if (!usersArr.includes(token)) {
    throw new ApolloError('USER NOT FOUND')
  }

  return {
    user: token
  }
}

module.exports = context

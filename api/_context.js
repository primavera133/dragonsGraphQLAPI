const { ApolloError } = require('apollo-server-micro')

const context = ({ req }) => {
  const authorizationHeader = (req.headers && req.headers.authorization) || ''
  const users = process.env.API_USERS || ''
  const usersArr = users.split(' ')
  const token = authorizationHeader.replace('Bearer ')

  if (!usersArr.includes(token)) {
    throw new ApolloError(`USER ${token} NOT FOUND`)
  }

  return {
    user: token
  }
}

module.exports = context

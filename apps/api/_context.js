const { GraphQLError } = require('graphql')

const context = ({ req }) => {
  // Optional authentication - if API_USERS is set, check for valid token
  const authorizationHeader = (req.headers && req.headers.authorization) || ''
  const users = process.env.API_USERS || ''
  
  // If no users configured, allow all requests
  if (!users) {
    return { user: null }
  }
  
  const usersArr = users.split(' ')
  const token = authorizationHeader.replace('Bearer ', '')

  if (!usersArr.includes(token)) {
    console.error(`USER ${token} NOT FOUND`)
    throw new GraphQLError(`USER ${token} NOT FOUND`, {
      extensions: {
        code: 'UNAUTHENTICATED'
      }
    })
  }

  return {
    user: token
  }
}

module.exports = context

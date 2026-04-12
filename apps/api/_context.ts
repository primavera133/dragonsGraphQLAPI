import { GraphQLError } from 'graphql'

interface ContextRequest {
  headers?: Record<string, string | undefined>
  authorization?: string
}

const context = ({ req }: { req: ContextRequest }) => {
  const authorizationHeader = (req.headers && req.headers.authorization) || ''
  const users = process.env.API_USERS || ''

  if (!users) {
    return { user: null }
  }

  const usersArr = users.split(' ')
  const token = authorizationHeader.replace('Bearer ', '')

  if (!usersArr.includes(token)) {
    console.error(`USER ${token} NOT FOUND`)
    throw new GraphQLError(`USER ${token} NOT FOUND`, {
      extensions: { code: 'UNAUTHENTICATED' },
    })
  }

  return { user: token }
}

export default context

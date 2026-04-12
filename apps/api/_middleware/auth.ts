import { GraphQLError } from 'graphql'
import type { AuthInfo } from '../_types'

interface Request {
  headers: Record<string, string | undefined>
  query?: Record<string, string | undefined>
  body?: { variables?: { apiKey?: string } }
  ip?: string
  connection?: { remoteAddress?: string }
}

function validateApiKey(apiKey: string | undefined): { isValid: true; keyId: string } {
  if (!apiKey) {
    throw new GraphQLError('API key required. Access denied without authentication.', {
      extensions: {
        code: 'UNAUTHENTICATED',
        hint: 'Include your API key in the X-API-Key header or apiKey query parameter',
      },
    })
  }

  const validKeys = process.env.VALID_API_KEYS?.split(',') ?? []

  if (validKeys.length === 0) {
    throw new GraphQLError('API not configured. No valid API keys found.', {
      extensions: { code: 'SERVER_ERROR' },
    })
  }

  if (!validKeys.includes(apiKey)) {
    throw new GraphQLError('Invalid API key. Access denied.', {
      extensions: { code: 'UNAUTHENTICATED' },
    })
  }

  return { isValid: true, keyId: apiKey }
}

function extractApiKey(req: Request): { apiKey: string | undefined; ip: string } {
  const apiKey =
    req.headers['x-api-key'] ??
    req.query?.apiKey ??
    req.body?.variables?.apiKey

  const ip = req.ip ?? req.connection?.remoteAddress ?? 'unknown'

  return { apiKey, ip }
}

function authenticateRequest(req: Request): AuthInfo {
  const { apiKey, ip } = extractApiKey(req)
  const validation = validateApiKey(apiKey)

  return {
    isAuthenticated: true,
    apiKey: apiKey as string,
    keyId: validation.keyId,
    ip,
    timestamp: new Date().toISOString(),
  }
}

export { authenticateRequest, validateApiKey, extractApiKey }

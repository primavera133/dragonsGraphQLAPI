const { GraphQLError } = require('graphql')

/**
 * API Key validation - strict authentication required
 */
function validateApiKey(apiKey) {
  if (!apiKey) {
    throw new GraphQLError('API key required. Access denied without authentication.', {
      extensions: { 
        code: 'UNAUTHENTICATED',
        hint: 'Include your API key in the X-API-Key header or apiKey query parameter'
      }
    })
  }
  
  // Get valid API keys from environment
  const validKeys = process.env.VALID_API_KEYS?.split(',') || []
  
  if (validKeys.length === 0) {
    throw new GraphQLError('API not configured. No valid API keys found.', {
      extensions: { code: 'SERVER_ERROR' }
    })
  }
  
  if (!validKeys.includes(apiKey)) {
    throw new GraphQLError('Invalid API key. Access denied.', {
      extensions: { code: 'UNAUTHENTICATED' }
    })
  }
  
  return { 
    isValid: true, 
    keyId: apiKey
  }
}

/**
 * Extract API key from request
 */
function extractApiKey(req) {
  // Try different locations for API key
  const apiKey = req.headers['x-api-key'] || 
                req.query?.apiKey || 
                req.body?.variables?.apiKey
  
  const ip = req.ip || req.connection.remoteAddress || 'unknown'
  
  return { apiKey, ip }
}

/**
 * Main authentication middleware - requires valid API key
 */
function authenticateRequest(req) {
  const { apiKey, ip } = extractApiKey(req)
  
  // Validate API key (will throw if invalid or missing)
  const validation = validateApiKey(apiKey)
  
  return {
    isAuthenticated: true,
    apiKey,
    keyId: validation.keyId,
    ip,
    timestamp: new Date().toISOString()
  }
}

module.exports = {
  authenticateRequest,
  validateApiKey,
  extractApiKey
}

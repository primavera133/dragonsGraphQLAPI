const { authenticateRequest, validateApiKey } = require('../_middleware/auth')
const { GraphQLError } = require('graphql')

describe('API Key Authentication', () => {
  let originalEnv

  beforeEach(() => {
    originalEnv = process.env
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('Strict Authentication', () => {
    it('should reject requests without API key', () => {
      process.env.VALID_API_KEYS = 'test-key-1,test-key-2'
      
      const mockReq = {
        ip: '127.0.0.1',
        headers: {},
        query: {},
        body: {}
      }
      
      expect(() => {
        authenticateRequest(mockReq)
      }).toThrow('API key required. Access denied without authentication.')
    })

    it('should reject requests with invalid API key', () => {
      process.env.VALID_API_KEYS = 'test-key-1,test-key-2'
      
      const mockReq = {
        ip: '127.0.0.1',
        headers: {
          'x-api-key': 'invalid-key'
        }
      }
      
      expect(() => {
        authenticateRequest(mockReq)
      }).toThrow('Invalid API key. Access denied.')
    })

    it('should accept requests with valid API key in header', () => {
      process.env.VALID_API_KEYS = 'test-key-1,test-key-2'
      
      const mockReq = {
        ip: '127.0.0.1',
        headers: {
          'x-api-key': 'test-key-1'
        }
      }
      
      const result = authenticateRequest(mockReq)
      
      expect(result.isAuthenticated).toBe(true)
      expect(result.apiKey).toBe('test-key-1')
      expect(result.ip).toBe('127.0.0.1')
    })

    it('should accept requests with valid API key in query parameter', () => {
      process.env.VALID_API_KEYS = 'test-key-1,test-key-2'
      
      const mockReq = {
        ip: '127.0.0.1',
        headers: {},
        query: {
          apiKey: 'test-key-2'
        }
      }
      
      const result = authenticateRequest(mockReq)
      
      expect(result.isAuthenticated).toBe(true)
      expect(result.apiKey).toBe('test-key-2')
    })

    it('should reject when no API keys are configured', () => {
      delete process.env.VALID_API_KEYS
      
      const mockReq = {
        ip: '127.0.0.1',
        headers: {
          'x-api-key': 'any-key'
        }
      }
      
      expect(() => {
        authenticateRequest(mockReq)
      }).toThrow('API not configured. No valid API keys found.')
    })
  })
})

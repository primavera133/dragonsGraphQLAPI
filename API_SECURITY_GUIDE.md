# API Security Guide - Strict Authentication

## Overview

Your Dragons GraphQL API now uses **strict API key authentication**, making it completely inaccessible without a valid API key. This ensures maximum security with a simple, maintainable approach.

## Security Model

- **Zero Public Access**: No requests allowed without authentication
- **API Key Required**: All requests must include a valid API key
- **Simple Configuration**: Just set API keys in environment variables
- **Clear Error Messages**: Helpful feedback for authentication issues

## Setup

### 1. Environment Configuration

Create a `.env` file:

```bash
# REQUIRED: Valid API keys (comma-separated)
VALID_API_KEYS=your-secure-key-1,your-secure-key-2

# Environment
NODE_ENV=production
```

### 2. Generate Secure API Keys

```bash
# Generate a secure 32-byte hex key
openssl rand -hex 32

# Example output: 8f94b3b2a1c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2
```

## Authentication Methods

### 1. Header Authentication (Recommended)
```bash
curl -H "X-API-Key: your-api-key" \
     -H "Content-Type: application/json" \
     -d '{"query": "{ families { name } }"}' \
     https://your-api.com/api
```

### 2. Query Parameter
```bash
curl -H "Content-Type: application/json" \
     -d '{"query": "{ families { name } }"}' \
     "https://your-api.com/api?apiKey=your-api-key"
```

### 3. Request Body Variable
```bash
curl -H "Content-Type: application/json" \
     -d '{"query": "{ families { name } }", "variables": {"apiKey": "your-api-key"}}' \
     https://your-api.com/api
```

## Error Responses

### Missing API Key
```json
{
  "errors": [{
    "message": "API key required. Access denied without authentication.",
    "extensions": {
      "code": "UNAUTHENTICATED",
      "hint": "Include your API key in the X-API-Key header or apiKey query parameter"
    }
  }]
}
```

### Invalid API Key
```json
{
  "errors": [{
    "message": "Invalid API key. Access denied.",
    "extensions": {
      "code": "UNAUTHENTICATED"
    }
  }]
}
```

### Server Misconfiguration
```json
{
  "errors": [{
    "message": "API not configured. No valid API keys found.",
    "extensions": {
      "code": "SERVER_ERROR"
    }
  }]
}
```

## Deployment Examples

### Development
```bash
NODE_ENV=development
VALID_API_KEYS=dev-key-123
```

### Staging
```bash
NODE_ENV=staging
VALID_API_KEYS=staging-key-1,staging-key-2
```

### Production
```bash
NODE_ENV=production
VALID_API_KEYS=prod-key-abc123,prod-key-def456,prod-key-ghi789
```

## Security Features

### Built-in Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- CORS configured for API key headers

### Production Hardening
- GraphQL introspection disabled in production
- Secure error handling without information leakage
- Environment-based configuration

## Best Practices

### 1. API Key Management
✅ **Generate strong keys**: Use `openssl rand -hex 32`  
✅ **Rotate regularly**: Change keys periodically  
✅ **Use multiple keys**: Different keys for different clients  
✅ **Store securely**: Never commit to version control  

### 2. Environment Security
✅ **Environment variables**: Use `.env` files or secure management  
✅ **Secret management**: Use cloud provider secret services  
✅ **Access control**: Limit who can view/modify keys  

### 3. Network Security
✅ **HTTPS only**: Always use HTTPS in production  
✅ **Firewall rules**: Restrict to known IP ranges  
✅ **Proxy/CDN**: Use Cloudflare or similar for DDoS protection  

## Testing

Run the authentication tests:

```bash
npm test
```

Tests verify:
- ✅ Requests without API keys are rejected
- ✅ Invalid API keys are rejected
- ✅ Valid API keys are accepted
- ✅ Multiple authentication methods work
- ✅ Server configuration errors are handled

## Monitoring

### What to Monitor
- Authentication success/failure rates
- Usage patterns per API key
- Unusual access attempts
- Performance metrics

### Logging Examples
```javascript
// Successful authentication
console.log('API access granted', { 
  keyId: 'key-abc123...', 
  ip: '192.168.1.100',
  timestamp: '2025-07-10T10:30:00Z'
})

// Failed authentication
console.warn('API access denied', { 
  reason: 'invalid_key',
  ip: '192.168.1.100',
  timestamp: '2025-07-10T10:30:00Z'
})
```

## Advanced Security (Optional)

### IP Allowlisting
Add IP restrictions for extra security:

```javascript
// In auth middleware
const allowedIPs = process.env.ALLOWED_IPS?.split(',') || []
if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP)) {
  throw new GraphQLError('IP not allowed')
}
```

### Request Signing
For ultra-high security, implement HMAC request signing:

```javascript
// Client-side
const signature = crypto
  .createHmac('sha256', secretKey)
  .update(requestBody)
  .digest('hex')

// Include in X-Signature header
```

## Troubleshooting

### Common Issues

**Problem**: "API key required" error  
**Solution**: Ensure `VALID_API_KEYS` environment variable is set

**Problem**: "Invalid API key" error  
**Solution**: Check API key format and verify it's in `VALID_API_KEYS`

**Problem**: "API not configured" error  
**Solution**: Set the `VALID_API_KEYS` environment variable and restart

### Debug Mode
```bash
NODE_ENV=development
DEBUG=1
```

## Migration from Complex Setup

If you previously had rate limiting and public access:

| Before | After |
|--------|-------|
| Public access allowed | ❌ Blocked |
| Rate limiting per IP | ❌ Not needed |
| Complex configuration | ✅ Simple |
| Multiple security layers | ✅ Single, strong layer |

The new approach trades flexibility for security and simplicity.

## Support

For issues:
1. Check environment variables
2. Verify API key format
3. Review server logs
4. Test with curl commands above

Your API is now fully secured with minimal complexity! 🔒
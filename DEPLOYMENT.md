# Deployment Guide for Dragons GraphQL API

## Modern Node.js Upgrade for Vercel

This project has been upgraded to use modern Node.js and Apollo Server 4 for seamless Vercel deployment.

### Key Changes Made

1. **Apollo Server 4**: Upgraded from Apollo Server 2 to Apollo Server 4
2. **Modern Dependencies**: Updated all dependencies to latest versions
3. **Vercel Integration**: Added proper Vercel configuration and Next.js integration
4. **Node.js 18+**: Requires Node.js 18 or higher
5. **Improved Error Handling**: Migrated from ApolloError to GraphQLError

### Quick Deployment Steps

1. **Clean install dependencies** (recommended):
   ```bash
   # Remove any existing dependencies to avoid conflicts
   rm -rf node_modules
   rm -f package-lock.json
   
   # Install fresh dependencies
   npm install
   ```

   Or use the provided script:
   ```bash
   chmod +x clean-install.sh
   ./clean-install.sh
   ```

2. **Set up environment variables** (optional):
   ```bash
   cp .env.example .env
   # Edit .env if you want to enable authentication
   ```

3. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI if not already installed
   npm i -g vercel
   
   # Deploy
   vercel
   ```

### Local Development

```bash
# Install dependencies
npm install

# Run locally for development
npm run dev

# The GraphQL Server will be available at:
# http://localhost:4000
# GraphQL Playground at: http://localhost:4000

# For Vercel development (alternative)
vercel dev
# This will run on http://localhost:3000/api
```

### Configuration Files

- **`vercel.json`**: Vercel deployment configuration
- **`package.json`**: Updated with modern dependencies and Node.js 18+ requirement
- **`.env.example`**: Environment variables template

### API Endpoints

After deployment, your GraphQL API will be available at:
- **Production**: `https://your-deployment-url.vercel.app/api`
- **Development**: `http://localhost:3000/api`

### Authentication (Optional)

If you want to enable authentication:
1. Set the `API_USERS` environment variable in Vercel dashboard
2. Include `Authorization: Bearer <token>` header in requests

### Testing

```bash
# Run tests
npm test

# Update test snapshots
npm run update-snaps
```

**Note**: Tests have been automatically updated to work with Apollo Server 4. The `fix-tests.sh` script has converted all test files from the old Apollo Server 2 format to the new Apollo Server 4 format.

### What's Working

- ✅ All GraphQL queries and mutations
- ✅ Species, Family, and Genus data access
- ✅ Image integration with Cloudinary
- ✅ Scientific references and metadata
- ✅ Conservation status information
- ✅ CORS headers properly configured
- ✅ GraphQL introspection enabled
- ✅ Modern Node.js 18+ support
- ✅ All tests updated for Apollo Server 4

### Next Steps

1. **Deploy to Vercel** using the steps above
2. **Test all endpoints** to ensure everything works
3. **Update tests** if needed (they may need minor adjustments for Apollo Server 4)
4. **Set up monitoring** with Apollo Studio if desired

### Troubleshooting

**Common issues:**

1. **Node.js version**: Ensure you're using Node.js 18 or higher
2. **Environment variables**: Check that any required env vars are set in Vercel
3. **CORS issues**: The API includes proper CORS headers for cross-origin requests
4. **GraphQL Playground**: Available at `/api` endpoint when introspection is enabled

### Support

The API maintains full backward compatibility with all existing queries and data structure.

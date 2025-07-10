module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/__utils'],
  
  // Test organization
  testMatch: [
    '**/api/__tests__/**/*.e2e.js',
    '**/api/__tests__/**/*.spec.js',
    '**/api/_utils/**/*.spec.js'
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'api/**/*.js',
    '!api/__tests__/**',
    '!api/_data/**',
    '!**/node_modules/**'
  ],
  
  // Performance settings
  testTimeout: 10000, // 10 seconds for e2e tests
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/api/__tests__/jest.setup.js'],
  
  // Verbose output for better debugging
  verbose: true
}

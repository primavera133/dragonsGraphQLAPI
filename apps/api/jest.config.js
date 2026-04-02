module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/__utils'],
  
  // Test organization
  testMatch: [
    '**/__tests__/**/*.e2e.js',
    '**/__tests__/**/*.spec.js',
    '**/_utils/**/*.spec.js'
  ],

  collectCoverageFrom: [
    '**/*.js',
    '!__tests__/**',
    '!_data/**',
    '!**/node_modules/**',
    '!api/index.js'
  ],

  testTimeout: 10000,

  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.js'],
  
  // Verbose output for better debugging
  verbose: true
}

/**
 * Jest setup file for global test configuration
 */

// Global test timeout for async operations
jest.setTimeout(10000)

// Mock console.log in tests to reduce noise
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: console.error // Keep error logging for debugging
}

// Global test helpers
global.testHelpers = {
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  expectAsync: async (asyncFn, timeout = 5000) => {
    return Promise.race([
      asyncFn(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Test timeout')), timeout)
      )
    ])
  }
}

// Clean up after tests
afterEach(() => {
  // Reset all mocks
  jest.clearAllMocks()
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/__utils'],

  // Resolve .ts before .js so TypeScript source is preferred
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Transform .ts files with ts-jest
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },

  // Test organization
  testMatch: [
    '**/__tests__/**/*.e2e.js',
    '**/__tests__/**/*.spec.js',
    '**/_utils/**/*.spec.js',
  ],

  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!__tests__/**',
    '!_data/**',
    '!**/node_modules/**',
    '!api/index.{js,ts}',
  ],

  testTimeout: 10000,

  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.js'],

  verbose: true,
}

module.exports = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    }
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    './src/**/*.js',
    '!./src/app.js',
    '!./src/server.js',
    '!./src/routes/*.js'
  ],
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
};

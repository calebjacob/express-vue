module.exports = {
  displayName: 'backend',

  moduleFileExtensions: [
    'js'
  ],

  setupTestFrameworkScriptFile: './jest.backend.setup.js',

  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/app/backend/**/*.test.js'
  ],

  watchPathIgnorePatterns: [
    '<rootDir>/app/frontend/'
  ]
};

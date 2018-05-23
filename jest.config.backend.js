module.exports = {
  displayName: 'backend',

  moduleFileExtensions: [
    'js'
  ],

  setupTestFrameworkScriptFile: './jest.setup.backend.js',

  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/app/backend/**/*.test.js'
  ]
};

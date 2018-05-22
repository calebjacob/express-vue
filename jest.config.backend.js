module.exports = {
  displayName: 'backend',

  moduleFileExtensions: [
    'js'
  ],

  setupTestFrameworkScriptFile: './jest.setup.backend.js',

  testMatch: [
    '<rootDir>/app/node_modules/**/*.test.js'
  ]
};

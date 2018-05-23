module.exports = {
  displayName: 'backend',

  moduleFileExtensions: [
    'js'
  ],

  setupTestFrameworkScriptFile: './jest.setup.backend.js',

  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/app/index.test.js',
    '<rootDir>/app/node_modules/**/*.test.js'
  ],

  transformIgnorePatterns: ['<rootDir>/app/index.js', '<rootDir>/app/node_modules/']
};

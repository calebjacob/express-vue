module.exports = {
  displayName: 'frontend',

  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/frontend/js/$1'
  },

  setupTestFrameworkScriptFile: './jest.frontend.setup.js',

  snapshotSerializers: [
    'jest-serializer-vue'
  ],

  testEnvironment: 'jsdom',

  testMatch: [
    '<rootDir>/app/frontend/js/**/*.test.js'
  ],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  }
};

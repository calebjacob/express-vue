module.exports = {
  displayName: 'frontend',

  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/ui/js/$1'
  },

  setupTestFrameworkScriptFile: './jest.setup.frontend.js',

  snapshotSerializers: [
    'jest-serializer-vue'
  ],

  testMatch: [
    '<rootDir>/app/ui/js/**/*.test.js'
  ],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  }
};

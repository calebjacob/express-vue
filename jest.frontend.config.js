module.exports = {
  displayName: 'frontend',

  preset: '@vue/cli-plugin-unit-jest',

  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/frontend/js/$1'
  },

  testMatch: ['<rootDir>/app/frontend/js/**/*.test.{j,t}s?(x)'],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },

  verbose: false,
  silent: false,

  watchPathIgnorePatterns: ['<rootDir>/app/backend/']
};

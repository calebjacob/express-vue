module.exports = {
  displayName: 'frontend',

  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],

  transform: {
    '^.+\\.vue$': 'vue-jest'
  },

  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
};

module.exports = {
  displayName: 'frontend',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/frontend/src/$1',
    '^shared/(.*)$': '<rootDir>/app/shared/$1'
  },

  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],

  testMatch: ['<rootDir>/app/frontend/src/**/*.test.ts?(x)'],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/app/frontend/tsconfig.json'
    }
  }
};

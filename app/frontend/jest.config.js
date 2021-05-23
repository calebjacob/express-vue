module.exports = {
  displayName: 'frontend',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^shared/(.*)$': `${process.cwd()}/app/shared/$1`
  },

  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],

  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest'
  }
};

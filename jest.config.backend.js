module.exports = {
  displayName: 'backend',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/backend/src/$1',
    '^shared/(.*)$': '<rootDir>/app/shared/$1'
  },

  moduleFileExtensions: ['js', 'ts', 'json'],

  testMatch: ['<rootDir>/app/backend/src/**/*.test.ts'],

  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};

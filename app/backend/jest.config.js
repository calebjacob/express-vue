module.exports = {
  displayName: 'backend',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  moduleFileExtensions: ['js', 'ts', 'json'],

  testMatch: ['<rootDir>/src/**/*.test.ts'],

  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};

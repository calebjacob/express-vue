module.exports = {
  displayName: 'backend',

  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  testMatch: ['<rootDir>/src/**/*.test.ts?(x)']
};

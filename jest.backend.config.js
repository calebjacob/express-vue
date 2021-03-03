module.exports = {
  displayName: 'backend',

  moduleFileExtensions: ['js'],

  setupFilesAfterEnv: ['./jest.backend.setup.js'],

  testEnvironment: 'node',

  testMatch: ['<rootDir>/app/backend/**/*.test.js'],

  watchPathIgnorePatterns: ['<rootDir>/app/frontend/']
};

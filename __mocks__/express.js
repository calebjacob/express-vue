const express = jest.fn(() => {
  return {
    engine: jest.fn(),
    listen: jest.fn(),
    set: jest.fn(),
    use: jest.fn()
  }
});

express.Router = jest.fn(() => {
  return 'express router';
});

express.json = jest.fn(() => {
  return `express json parser`;
});

express.static = jest.fn((input) => {
  return `express static - ${input}`;
});

express.urlencoded = jest.fn(() => {
  return `express json urlencoded parser`;
});

module.exports = express;

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

express.static = jest.fn((input) => {
  return `express static - ${input}`;
});



module.exports = express;

function express() {
  return {
    engine: jest.fn(),
    listen: jest.fn(),
    set: jest.fn(),
    use: jest.fn()
  };
};

express.static = (input) => {
  return `express static - ${input}`;
};



module.exports = express;

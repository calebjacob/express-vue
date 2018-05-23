const bodyParser = {
  json: jest.fn(() => {
    return 'bodyParser.json()';
  }),

  urlencoded: jest.fn(() => {
    return 'bodyParser.urlencoded()';
  })
};



module.exports = bodyParser;

// subject:

const example = require('./example');

// mocks:

let req;
let res;

// tests:

describe('api - example', () => {
  beforeEach(() => {
    req = nodeMocksHttp.createRequest();
    res = nodeMocksHttp.createResponse();

    jest.spyOn(res, 'json');
  });

  describe('get()', () => {
    beforeEach(() => {
      req.foobar = false;

      example.get(req, res);
    });

    it('renders some json', () => {
      expect(res.json).toHaveBeenCalledWith({
        thing: 'car',
        color: 'blue',
        miles: 7000,
        foobar: false
      });
    });
  });

  describe('post()', () => {
    beforeEach(() => {
      example.post(req, res);
    });

    it('renders some json', () => {
      expect(res.json).toHaveBeenCalledWith({
        id: 1
      });
    });
  });
});

// subject:

const debug = require('./debug');

// mocks:

const error = new Error('Something exploded!');
const next = jest.fn();
let req;
let res;

global.console = {
  dir: jest.fn()
};

// tests:

describe('helpers - debug', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    req = nodeMocksHttp.createRequest();
    res = nodeMocksHttp.createResponse();

    debug(error, req, res, next);
  });

  it('logs error', () => {
    expect(console.dir).toHaveBeenCalledWith(error, {
      depth: null,
      colors: true
    });
  });

  it('passes error along to next()', () => {
    expect(next).toHaveBeenCalledWith(error);
  });
});

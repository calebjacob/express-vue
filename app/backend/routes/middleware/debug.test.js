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

describe('middleware - debug', () => {
  beforeEach(() => {
    req = nodeMocksHttp.createRequest();
    res = nodeMocksHttp.createResponse();
    next.mockClear();

    jest.spyOn(res, 'json');
    jest.spyOn(res, 'status');

    debug(error, req, res, next);
  });

  it('logs error', () => {
    expect(console.dir).toHaveBeenCalledWith(error, {
      depth: null,
      colors: true
    });
  });

  it('sets status to 500', () => {
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('sends empty json response', () => {
    expect(res.json).toHaveBeenCalledWith({});
  });
});

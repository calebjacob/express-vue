// subject:

const example = require('./example');



// mocks:

const next = jest.fn();
let req;
let res;



// tests:

describe('middleware - example', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    req = nodeMocksHttp.createRequest();
    res = nodeMocksHttp.createResponse();

    jest.spyOn(res, 'json');

    example(req, res, next);
  });

  it('passes through foobar param', () => {
    expect(req.foobar).toEqual(true);
  });

  it('calls next()', () => {
    expect(next).toHaveBeenCalled();
  });
});

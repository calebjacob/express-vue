// subject:

const middleware = require('./index');



// dependencies:

const example = require('./example');



// mocks:

const routers = {
  public: {
    use: jest.fn()
  }
};



// tests:

describe('middleware', function() {
  beforeEach(function() {
    routers.public.use.mockClear();

    middleware(routers);
  });

  it('example() is configured', function() {
    expect(routers.public.use).toHaveBeenCalledWith(example);
  });
});

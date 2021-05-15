// mocks:

const routers = {
  public: {
    use: jest.fn()
  }
};

// dependencies:

const example = require('./example');

// subject:

const middleware = require('./index');

// tests:

describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    middleware(routers);
  });

  it('example() is configured', () => {
    expect(routers.public.use).toHaveBeenCalledWith(example);
  });
});

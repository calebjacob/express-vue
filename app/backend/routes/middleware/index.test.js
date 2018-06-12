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

describe('middleware', () => {
  beforeEach(() => {
    routers.public.use.mockClear();

    middleware(routers);
  });

  it('example() is configured', () => {
    expect(routers.public.use).toHaveBeenCalledWith(example);
  });
});

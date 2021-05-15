// mocks:

const routers = {
  public: {
    get: jest.fn(),
    post: jest.fn()
  }
};

// dependencies:

const example = require('./example');

// subject:

const api = require('./index');

// tests:

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    api(routers);
  });

  it('example.get() is configured', () => {
    expect(routers.public.get).toHaveBeenCalledWith(
      '/api/example',
      example.get
    );
  });

  it('example.post() is configured', () => {
    expect(routers.public.post).toHaveBeenCalledWith(
      '/api/example',
      example.post
    );
  });
});

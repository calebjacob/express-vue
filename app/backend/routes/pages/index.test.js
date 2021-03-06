// dependencies:

const vue = require('./vue');

// mocks:

const routers = {
  public: {
    get: jest.fn()
  }
};

// subject:

const pages = require('./index');

// tests:

describe('pages', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    pages(routers);
  });

  it('vue.get() is configured', () => {
    expect(routers.public.get).toHaveBeenCalledWith(/^(?!\/api).*/, vue.get);
  });
});

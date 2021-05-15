// mocks:

const routers = {
  public: {
    get: jest.fn()
  }
};

// dependencies:

const vue = require('./vue');

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

// subject:

const pages = require('./index');



// dependencies:

const vue = require('./vue');



// mocks:

const routers = {
  public: {
    get: jest.fn()
  }
};



// tests:

describe('pages', () => {
  beforeEach(() => {
    routers.public.get.mockClear();

    pages(routers);
  });

  it('vue.get() is configured', () => {
    expect(routers.public.get).toHaveBeenCalledWith(/^(?!\/api).*/, vue.get);
  });
});

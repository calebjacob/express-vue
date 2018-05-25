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

describe('pages', function() {
  beforeEach(function() {
    routers.public.get.mockClear();

    pages(routers);
  });

  it('vue.get() is configured', function() {
    expect(routers.public.get).toHaveBeenCalledWith(/^(?!\/api).*/, vue.get);
  });
});

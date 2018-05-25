// subject:

const api = require('./index');



// dependencies:

const example = require('./example');



// mocks:

const routers = {
  public: {
    get: jest.fn(),
    post: jest.fn()
  }
};



// tests:

describe('api', function() {
  beforeEach(function() {
    routers.public.get.mockClear();
    routers.public.post.mockClear();

    api(routers);
  });

  it('example.get() is configured', function() {
    expect(routers.public.get).toHaveBeenCalledWith('/api/example', example.get);
  });

  it('example.post() is configured', function() {
    expect(routers.public.post).toHaveBeenCalledWith('/api/example', example.post);
  });
});

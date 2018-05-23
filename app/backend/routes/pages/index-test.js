let routers = {
  public: {
    get: sinon.spy(function get() {})
  }
};
let pages = require('routes/pages');
let vue = require('routes/pages/vue');



describe('pages', function() {
  beforeEach(function() {
    routers.public.get.reset();

    pages(routers);
  });

  describe('/*', function() {
    it('vue.get() is configured on the public router', function() {
      sinon.assert.calledWith(routers.public.get, /^(?!\/api).*/, vue.get);
    });
  });
});

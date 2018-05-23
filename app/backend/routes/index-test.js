let app = {
  use: sinon.spy(function use() {})
};
let pages = sinon.spy(function pages() {});



let routes = proxyquire('routes', {
  'express': {
    Router: function Router() {
      return 'express router';
    }
  },
  'routes/pages': pages
});



describe('routes', function() {
  beforeEach(function() {
    app.use.reset();
    pages.reset();

    routes(app);
  });

  it('all pages are included', function() {
    sinon.assert.calledWith(pages, {
      public: 'express router'
    });
  });

  it('hooks up all routers', function() {
    sinon.assert.calledWith(app.use, '/', 'express router');
    sinon.assert.callCount(app.use, 1);
  });
});

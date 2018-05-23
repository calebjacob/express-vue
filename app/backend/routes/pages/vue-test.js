let req;
let res;
let next = sinon.spy(function next() {});



let vue = proxyquire('routes/pages/vue', {});



describe('pages - vue', function() {
  beforeEach(function() {
    next.reset();

    req = nodeMocksHttp.createRequest();
    res = nodeMocksHttp.createResponse();

    sinon.spy(res, 'render');
  });

  describe('get()', function() {
    beforeEach(function() {
      vue.get(req, res, next);
    });

    it('renders a view', function() {
      sinon.assert.calledWith(res.render, 'pages/vue');
    });
  });
});

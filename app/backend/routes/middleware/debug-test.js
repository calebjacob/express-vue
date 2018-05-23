let req;
let res;
let next = sinon.spy(function next() {});
let debug = require('routes/middleware/debug');
let error = 'This is the error';



describe('middleware - debug()', function() {
  beforeEach(function() {
    next.reset();

    req = nodeMocksHttp.createRequest();
    res = nodeMocksHttp.createResponse();

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    debug(error, req, res, next);
  });

  it('sets status to 500', function() {
    sinon.assert.calledWith(res.status, 500);
  });

  it('sends empty json response', function() {
    sinon.assert.calledWith(res.json, {});
  });
});

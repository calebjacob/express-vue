var routes = sinon.spy(function routes() {});

var express = function express() {
  return {
    engine: sinon.spy(function engine() {}),
    listen: sinon.spy(function listen() {}),
    set: sinon.spy(function set() {}),
    use: sinon.spy(function use() {})
  };
};

express.static = function static(input) {
  return `express static - ${input}`;
};

var swig = {
  loaders: {
    fs: function fs(input) {
      return `swig loaders fs - ${input}`;
    }
  },
  renderFile: function renderFile() {},
  setDefaults: sinon.spy(function setDefaults() {})
};

var package = {
  name: 'foobar',
  version: 1
};

var config = {
  port: 1337
};

var debug = function debug() {};

var compression = function compression() {
  return 'compression()';
};

var bodyParser = {
  json: function json() {
    return 'bodyParser.json()';
  },
  urlencoded: function urlencoded() {
    return 'bodyParser.urlencoded()';
  }
};



var app = proxyquire(`${appRoot}`, {
  '../package.json': package,
  'body-parser': bodyParser,
  'compression': compression,
  'config': config,
  'express': express,
  'routes': routes,
  'routes/middleware/debug': debug,
  'swig-templates': swig,
});



describe('app', function() {
  it('sets up gzip compression', function() {
    sinon.assert.calledWith(app.use, compression());
  });

  it('sets up json body parsing', function() {
    sinon.assert.calledWith(app.use, bodyParser.json());
  });

  it('sets up urlencoded body parsing', function() {
    sinon.assert.calledWith(app.use, bodyParser.urlencoded());
  });

  it('sets up public directory', function() {
    sinon.assert.calledWith(app.use, `express static - ${appRoot}/public`);
  });

  it('sets up swig as the view engine', function() {
    sinon.assert.calledWith(swig.setDefaults, {
      loader: `swig loaders fs - ${appRoot}/views`
    });

    sinon.assert.calledWith(app.engine, 'swig', swig.renderFile);
    sinon.assert.calledWith(app.set, 'view engine', 'swig');
    sinon.assert.calledWith(app.set, 'views', `${appRoot}/views`);
  });

  it('sets locals', function() {
    expect(app.locals).to.deep.equal({
      package: package
    });
  });

  it('initializes all routes with express app', function() {
    sinon.assert.calledWith(routes, app);
  });

  it('sets up debug middleware after the routes have been set up', function() {
    sinon.assert.callOrder(routes, app.use);
    expect(app.use.lastCall.args[0]).to.equal(debug);
  });

  it('listens on port defined by config', function() {
    sinon.assert.calledWith(app.listen, config.port);
  });
});

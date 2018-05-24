// subject:

const routes = require('./index');



// dependencies:

const express = require('express');
const api = require('./api');
const pages = require('./pages');



// mocks:

jest.mock('express');

jest.mock('./api', () => {
  return jest.fn();
});

jest.mock('./pages', () => {
  return jest.fn();
});

const app = express();



// tests:

describe('routes', function() {
  beforeEach(function() {
    app.use.mockClear();

    routes(app);
  });

  it('all api routes are initialized', function() {
    expect(api).toHaveBeenCalledWith({
      public: 'express router'
    });
  });

  it('all page routes are initialized', function() {
    expect(pages).toHaveBeenCalledWith({
      public: 'express router'
    });
  });

  it('hooks up all routers', function() {
    expect(app.use).toHaveBeenCalledWith('/', 'express router');
  });
});

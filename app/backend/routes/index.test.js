// subject:

const routes = require('./index');

// dependencies:

const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const pages = require('./pages');

// mocks:

let mockInitializationCallOrder = [];

jest.mock('express');

jest.mock('./api', () => {
  return jest.fn(() => {
    mockInitializationCallOrder.push('api');
  });
});

jest.mock('./middleware', () => {
  return jest.fn(() => {
    mockInitializationCallOrder.push('middleware');
  });
});

jest.mock('./pages', () => {
  return jest.fn(() => {
    mockInitializationCallOrder.push('pages');
  });
});

const app = express();

// tests:

describe('routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockInitializationCallOrder = [];

    routes(app);
  });

  it('all middleware are initialized', () => {
    expect(middleware).toHaveBeenCalledWith({
      public: 'express router'
    });
  });

  it('all api routes are initialized', () => {
    expect(api).toHaveBeenCalledWith({
      public: 'express router'
    });
  });

  it('all page routes are initialized', () => {
    expect(pages).toHaveBeenCalledWith({
      public: 'express router'
    });
  });

  it('middleware is initialized before any other routes', () => {
    expect(mockInitializationCallOrder).toEqual(['middleware', 'api', 'pages']);
  });

  it('hooks up all routers', () => {
    expect(app.use).toHaveBeenCalledWith('/', 'express router');
  });
});

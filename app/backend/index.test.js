// subject:

const app = require('./index');



// dependencies:

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');

const config = require('./config');
const debug = require('./routes/middleware/debug');
const routes = require('./routes');



// mocks:

jest.mock('body-parser');
jest.mock('compression');
jest.mock('express');

jest.mock('./config', () => {
  return {
    port: 7777
  }
});

jest.mock('./routes', () => {
  return jest.fn()
});

jest.mock('./routes/middleware/debug', () => {
  return 'debug middleware'
});



describe('app', function() {
  it('sets up json body parsing', function() {
    expect(app.use).toHaveBeenCalledWith(bodyParser.json());
  });

  it('sets up urlencoded body parsing', function() {
    expect(bodyParser.urlencoded).toHaveBeenCalledWith({
      extended: true
    });

    expect(app.use).toHaveBeenCalledWith(bodyParser.urlencoded());
  });

  it('sets up gzip compression', function() {
    expect(app.use).toHaveBeenCalledWith(compression());
  });

  it('sets up public directories', function() {
    expect(app.use).toHaveBeenCalledWith(`express static - ${appRoot}/app/dist`);
    expect(app.use).toHaveBeenCalledWith(`express static - ${appRoot}/app/public`);
  });

  it('initializes all routes with express app', function() {
    expect(routes).toHaveBeenCalledWith(app);
  });

  it('sets up debug middleware', function() {
    expect(app.use).toHaveBeenCalledWith(debug);
  });

  it('listens on port defined by config', function() {
    expect(app.listen).toHaveBeenCalledWith(config.port);
  });
});

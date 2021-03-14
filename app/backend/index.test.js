// mocks:

jest.mock('compression');
jest.mock('express');

jest.mock('./config', () => {
  return {
    port: 7777
  };
});

jest.mock('./routes', () => {
  return jest.fn();
});

jest.mock('./routes/middleware/debug', () => {
  return 'debug middleware';
});

// dependencies:

const compression = require('compression');
const config = require('./config');
const debug = require('./routes/middleware/debug');
const express = require('express');
const routes = require('./routes');

// subject:

const app = require('./index');

// tests:

describe('app', () => {
  it('creats an express app instance', () => {
    expect(express).toHaveBeenCalled();
  });

  it('sets up json body parsing', () => {
    expect(app.use).toHaveBeenCalledWith(express.json());
  });

  it('sets up urlencoded body parsing', () => {
    expect(express.urlencoded).toHaveBeenCalledWith({
      extended: true
    });

    expect(app.use).toHaveBeenCalledWith(express.urlencoded());
  });

  it('sets up gzip compression', () => {
    expect(app.use).toHaveBeenCalledWith(compression());
  });

  it('sets up public directories', () => {
    expect(express.static).toHaveBeenCalledWith(`${appRoot}/app/public`);
    expect(express.static).toHaveBeenCalledWith(`${appRoot}/app/public/dist`);

    expect(app.use).toHaveBeenCalledWith(
      `express static - ${appRoot}/app/public`
    );
    expect(app.use).toHaveBeenCalledWith(
      `express static - ${appRoot}/app/public/dist`
    );
  });

  it('initializes all routes with express app', () => {
    expect(routes).toHaveBeenCalledWith(app);
  });

  it('sets up debug middleware', () => {
    expect(app.use).toHaveBeenCalledWith(debug);
  });

  it('listens on port defined by config', () => {
    expect(app.listen).toHaveBeenCalledWith(config.port);
  });
});

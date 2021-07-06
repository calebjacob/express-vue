// Subject:

import { createServer } from './server';

// Utils:

import { mock, MockProxy } from 'jest-mock-extended';
import { mocked } from 'ts-jest/utils';

// Dependencies:

import appRoot from 'app-root-path';
import config from '@/config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import routes from '@/routes';

// Mocks:

jest.mock('cookie-parser');
const cookieParserMock = mocked(cookieParser, true);

jest.mock('compression');
const compressionMock = mocked(compression, true);

jest.mock('express');
const expressMock = mocked(express, true);

jest.mock('@/config', () => {
  return {
    cookieSecret: 'COOKIE_SECRET_123',
    environment: 'ENVIRONMENT_123',
    port: 'PORT_1234'
  };
});

jest.mock('@/services/logger');

jest.mock('@/routes');
const routesMock = mocked(routes, true);

// Tests:

describe('createServer()', () => {
  let expressInstanceMock: MockProxy<Express>;

  beforeEach(() => {
    expressInstanceMock = mock<Express>();
    expressMock.mockReturnValue(expressInstanceMock);

    createServer();
  });

  it('creates an express instance', () => {
    expect(expressMock).toBeCalled();
  });

  it('configures json', () => {
    expect(expressMock.json).toBeCalled();
  });

  it('configures urlencoded', () => {
    expect(expressMock.urlencoded).toBeCalledWith({
      extended: true
    });
  });

  it('configures compression', () => {
    expect(compressionMock).toBeCalled();
  });

  it('configures static directorires', () => {
    expect(expressMock.static).toBeCalledWith(`${appRoot}/app/public`, {
      index: false
    });

    expect(expressMock.static).toBeCalledWith(`${appRoot}/app/frontend/dist`, {
      index: false
    });
  });

  it('configures cookies', () => {
    expect(cookieParserMock).toBeCalledWith(config.cookieSecret);
  });

  it('configures routes', () => {
    expect(routesMock).toBeCalledWith(expressInstanceMock);
  });

  it('listens on configured port', () => {
    expect(expressInstanceMock.listen).toBeCalledWith(config.port);
  });
});

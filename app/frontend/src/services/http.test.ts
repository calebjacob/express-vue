// subject:

import http, { responseErrorInterceptor } from './http';

// utils:

import { mock } from 'jest-mock-extended';
import { mocked } from 'ts-jest/utils';

// dependencies:

import { AxiosError, AxiosResponse } from 'axios';
import router from '@/router';

// mocks:

jest.mock('@/router');
const routerMock = mocked(router, true);

// tests:

describe('http', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exports the axios instance', () => {
    expect(http.defaults.timeout).toEqual(15000);
  });

  describe('responseErrorInterceptor()', () => {
    let error: AxiosError;

    beforeEach(() => {
      error = mock<AxiosError>();
    });

    describe('when status code is 401', () => {
      beforeEach(() => {
        const response = mock<AxiosResponse>();
        response.status = 401;
        error.response = response;
      });

      it('edirects to sign in page', () => {
        expect.hasAssertions();

        responseErrorInterceptor(error).catch((e) => {
          expect(e).toEqual(error);
          expect(routerMock.push).toHaveBeenCalledWith({
            name: 'signIn'
          });
        });
      });
    });

    describe('when status code is anything else', () => {
      beforeEach(() => {
        const response = mock<AxiosResponse>();
        response.status = 500;
        error.response = response;
      });

      it('does not redirects to sign in page', () => {
        expect.hasAssertions();

        responseErrorInterceptor(error).catch((e) => {
          expect(e).toEqual(error);
          expect(routerMock.push).not.toHaveBeenCalled();
        });
      });
    });
  });
});

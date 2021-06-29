// Subject:

import http, { responseErrorInterceptor } from './http';

// Utils:

import { mock, MockProxy } from 'jest-mock-extended';
import { mocked } from 'ts-jest/utils';

// Dependencies:

import { AxiosError, AxiosResponse } from 'axios';
import router from '@/router';
import { useTheSession } from '@/modules/session';
import { SessionModule } from '@/modules/session/types';

// Mocks:

jest.mock('@/router');
const routerMock = mocked(router, true);

jest.mock('@/modules/session');
const useTheSessionMock = mocked(useTheSession, true);

// Tests:

describe('http', () => {
  let theSessionModuleMock: MockProxy<SessionModule>;

  beforeEach(() => {
    theSessionModuleMock = mock<SessionModule>();
    useTheSessionMock.mockReturnValue(theSessionModuleMock);

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

      it('resets the session and redirects to sign in page', (done) => {
        expect.hasAssertions();

        responseErrorInterceptor(error).catch((e) => {
          expect(e).toEqual(error);
          expect(theSessionModuleMock.resetSession).toBeCalled();
          expect(routerMock.push).toBeCalledWith({
            name: 'signIn',
            query: {
              expired: 'true'
            }
          });
          done();
        });
      });
    });

    describe('when status code is anything else', () => {
      beforeEach(() => {
        const response = mock<AxiosResponse>();
        response.status = 500;
        error.response = response;
      });

      it('does not redirect to sign in page', (done) => {
        expect.hasAssertions();

        responseErrorInterceptor(error).catch((e) => {
          expect(e).toEqual(error);
          expect(theSessionModuleMock.resetSession).not.toBeCalled();
          expect(routerMock.push).not.toBeCalled();
          done();
        });
      });
    });
  });
});

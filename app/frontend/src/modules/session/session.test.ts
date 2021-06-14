// subject:

import { useSession } from './session';

// utils:

import { mock, MockProxy } from 'jest-mock-extended';
import { mocked } from 'ts-jest/utils';

// dependencies:

import {
  CreateAccountBody,
  CreateAccountResponse,
  CurrentUserResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { User, UserMock } from 'shared/types/models';
import { SessionModule } from './types';
import { useErrors } from '@/modules/errors';
import { ErrorsModule } from '@/modules/errors/types';
import { useTheNotifications, NotificationType } from '@/modules/notifications';
import { NotificationsModule } from '@/modules/notifications/types';
import cookies from '@/services/cookies';
import http from '@/services/http';
import { AxiosResponse } from 'axios';

// mocks:

jest.mock('@/modules/errors');
const useErrorsMock = mocked(useErrors, true);

jest.mock('@/modules/notifications');
const useTheNotificationsMock = mocked(useTheNotifications, true);

jest.mock('@/services/cookies');
const cookiesMock = mocked(cookies, true);

jest.mock('@/services/http');
const httpMock = mocked(http, true);

// tests:

describe('session', () => {
  let errorsModuleMock: MockProxy<ErrorsModule>;
  let notificationsModuleMock: MockProxy<NotificationsModule>;
  let session: SessionModule;

  beforeEach(() => {
    errorsModuleMock = mock<ErrorsModule>();
    useErrorsMock.mockReturnValue(errorsModuleMock);

    notificationsModuleMock = mock<NotificationsModule>();
    useTheNotificationsMock.mockReturnValue(notificationsModuleMock);

    session = useSession();
    jest.clearAllMocks();
  });

  it('defaults session values', () => {
    expect(session.session).toEqual({
      currentUser: null,
      isLoadingCurrentUser: false
    });
  });

  describe('createAccount()', () => {
    let body: CreateAccountBody;

    beforeEach(() => {
      body = {
        email: 'frodo@baggins.com',
        fullName: 'Frodo Baggins',
        password: 'the_shire'
      };
    });

    describe('when request succeeds', () => {
      let response: MockProxy<AxiosResponse<CreateAccountResponse>>;

      beforeEach(async () => {
        response = mock<AxiosResponse<CreateAccountResponse>>();
        response.data.user = UserMock();
        httpMock.post.mockResolvedValue(response);
        await session.createAccount(body);
      });

      it('makes API request to create account', () => {
        expect(httpMock.post).toBeCalledWith('/api/auth/create', body);
      });

      it('updates the currentUser value', () => {
        expect(session.session.currentUser).toEqual(response.data.user);
      });

      it('shows a notification', () => {
        expect(notificationsModuleMock.showNotification).toBeCalledWith({
          message: 'Welcome! Your account has been created.',
          type: NotificationType.SUCCESS
        });
      });
    });

    describe('when request fails', () => {
      const error = new Error('API request failed');

      beforeEach(() => {
        httpMock.post.mockRejectedValue(error);
      });

      it('throws the error and does nothing else', async () => {
        await expect(session.createAccount(body)).rejects.toThrow(error);
        expect(session.session.currentUser).toEqual(null);
        expect(notificationsModuleMock.showNotification).not.toBeCalled();
      });
    });
  });

  describe('load()', () => {
    describe('when isSignedIn cookie is not set', () => {
      beforeEach(async () => {
        cookiesMock.get.mockReturnValue(undefined);
        await session.load();
      });

      it('fetches the isSignedIn cookie', () => {
        expect(cookies.get).toBeCalledWith('isSignedIn');
      });

      it('does nothing', () => {
        expect(http.get).not.toBeCalled();
        expect(errorsModuleMock.handleErrorQuietly).not.toBeCalled();
      });
    });

    describe('when isSignedIn cookie is set', () => {
      beforeEach(() => {
        cookiesMock.get.mockReturnValue('true');
      });

      describe('when request is pending', () => {
        beforeEach(() => {
          httpMock.get.mockReturnValue(new Promise(() => {}));
          session.load();
        });

        it('sets loading status to true', () => {
          expect(session.session.isLoadingCurrentUser).toEqual(true);
        });
      });

      describe('when request succeeds', () => {
        let response: MockProxy<AxiosResponse<CurrentUserResponse>>;

        beforeEach(async () => {
          response = mock<AxiosResponse<CurrentUserResponse>>();
          response.data.user = UserMock();
          httpMock.get.mockResolvedValue(response);
          await session.load();
        });

        it('makes API request to fetch current user', () => {
          expect(http.get).toBeCalledWith('/api/auth/current');
        });

        it('updates the currentUser value', () => {
          expect(session.session.currentUser).toEqual(response.data.user);
        });

        it('sets loading status to false', () => {
          expect(session.session.isLoadingCurrentUser).toEqual(false);
        });
      });

      describe('when request fails', () => {
        const error = new Error('API request failed');

        beforeEach(async () => {
          httpMock.get.mockRejectedValue(error);
          await session.load();
        });

        it('handles the error', async () => {
          expect(errorsModuleMock.handleErrorQuietly).toBeCalledWith(error);
        });

        it('does not update the currentUser value', () => {
          expect(session.session.currentUser).toEqual(null);
        });

        it('sets loading status to false', () => {
          expect(session.session.isLoadingCurrentUser).toEqual(false);
        });
      });
    });
  });

  describe('setCurrentUser()', () => {
    let user: User;

    beforeEach(() => {
      user = UserMock();
      session.setCurrentUser(user);
    });

    it('updates the currentUser value', () => {
      expect(session.session.currentUser).toEqual(user);
    });
  });

  describe('signIn()', () => {
    let body: SignInBody;

    beforeEach(() => {
      body = {
        email: 'frodo@baggins.com',
        password: 'the_shire'
      };
    });

    describe('when request succeeds', () => {
      let response: MockProxy<AxiosResponse<SignInResponse>>;

      beforeEach(async () => {
        response = mock<AxiosResponse<SignInResponse>>();
        response.data.user = UserMock();
        httpMock.post.mockResolvedValue(response);
        await session.signIn(body);
      });

      it('makes API request to sign in', () => {
        expect(httpMock.post).toBeCalledWith('/api/auth/sign-in', body);
      });

      it('updates the currentUser value', () => {
        expect(session.session.currentUser).toEqual(response.data.user);
      });

      it('shows a notification', () => {
        expect(notificationsModuleMock.showNotification).toBeCalledWith({
          message: 'Welcome! You have signed in.',
          type: NotificationType.SUCCESS
        });
      });
    });

    describe('when request fails', () => {
      const error = new Error('API request failed');

      beforeEach(() => {
        httpMock.post.mockRejectedValue(error);
      });

      it('throws the error and does nothing else', async () => {
        await expect(session.signIn(body)).rejects.toThrow(error);
        expect(session.session.currentUser).toEqual(null);
        expect(notificationsModuleMock.showNotification).not.toBeCalled();
      });
    });
  });

  describe('signOut()', () => {
    beforeEach(() => {
      session.setCurrentUser(UserMock());
    });

    describe('when request succeeds', () => {
      let response: MockProxy<AxiosResponse>;

      beforeEach(async () => {
        response = mock<AxiosResponse>();
        httpMock.post.mockResolvedValue(response);
        await session.signOut();
      });

      it('updates the currentUser value', () => {
        expect(session.session.currentUser).toEqual(null);
      });

      it('shows a notification', () => {
        expect(notificationsModuleMock.showNotification).toBeCalledWith({
          message: 'Goodbye! You have signed out.',
          type: NotificationType.SUCCESS
        });
      });

      it('makes API request to sign out', () => {
        expect(http.post).toBeCalledWith('/api/auth/sign-out');
      });
    });

    describe('when request fails', () => {
      const error = new Error('API request failed');

      beforeEach(async () => {
        httpMock.post.mockRejectedValue(error);
        await session.signOut();
      });

      it('updates the currentUser value', () => {
        expect(session.session.currentUser).toEqual(null);
      });

      it('shows a notification', () => {
        expect(notificationsModuleMock.showNotification).toBeCalledWith({
          message: 'Goodbye! You have signed out.',
          type: NotificationType.SUCCESS
        });
      });

      it('handles the error', async () => {
        expect(errorsModuleMock.handleErrorQuietly).toBeCalledWith(error);
      });
    });
  });
});

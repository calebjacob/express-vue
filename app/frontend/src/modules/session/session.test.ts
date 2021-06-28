// Subject:

import { useSession } from './session';

// Utils:

import { mock, MockProxy } from 'jest-mock-extended';
import { mocked } from 'ts-jest/utils';
import { mockStore, StoreModuleMock } from '@/test-utils/mock-store';

// Dependencies:

import {
  CreateAccountBody,
  CreateAccountResponse,
  CurrentUserResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { UserMock } from 'shared/types/models';
import { Session, SessionModule } from './types';
import { useErrors } from '@/modules/errors';
import { ErrorsModule } from '@/modules/errors/types';
import { useTheNotifications, NotificationType } from '@/modules/notifications';
import { NotificationsModule } from '@/modules/notifications/types';
import { useStore } from '@/modules/store';
import http from '@/services/http';
import { AxiosResponse } from 'axios';

// Mocks:

jest.mock('@/modules/errors');
const useErrorsMock = mocked(useErrors, true);

jest.mock('@/modules/notifications');
const useTheNotificationsMock = mocked(useTheNotifications, true);

jest.mock('@/modules/store');
const useStoreMock = mocked(useStore, true);

jest.mock('@/services/http');
const httpMock = mocked(http, true);

// Tests:

describe('session', () => {
  let errorsModuleMock: MockProxy<ErrorsModule>;
  let notificationsModuleMock: MockProxy<NotificationsModule>;
  let session: SessionModule;
  let storeMock: StoreModuleMock<Session>;

  beforeEach(() => {
    errorsModuleMock = mock<ErrorsModule>();
    useErrorsMock.mockReturnValue(errorsModuleMock);

    notificationsModuleMock = mock<NotificationsModule>();
    useTheNotificationsMock.mockReturnValue(notificationsModuleMock);

    storeMock = mockStore<Session>('Session', {
      currentUser: null,
      isLoadingCurrentUser: false
    });

    session = useSession();
    jest.clearAllMocks();
  });

  it('creates and exports a "Session" store', () => {
    useSession();

    expect(useStoreMock).toBeCalledWith(
      'Session',
      {
        currentUser: null,
        isLoadingCurrentUser: false
      },
      {
        save: 'local'
      }
    );

    expect(session.resetSession).toBe(storeMock.reset);
    expect(session.session).toBe(storeMock.state);
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

      it('updates the store', () => {
        expect(storeMock.update).toBeCalledWith({
          currentUser: response.data.user
        });
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
        expect(storeMock.update).not.toBeCalled();
        expect(notificationsModuleMock.showNotification).not.toBeCalled();
      });
    });
  });

  describe('load()', () => {
    describe('when currentUser is not set', () => {
      beforeEach(async () => {
        storeMock.state.currentUser = null;
        await session.load();
      });

      it('does nothing', () => {
        expect(http.get).not.toBeCalled();
        expect(errorsModuleMock.handleErrorQuietly).not.toBeCalled();
      });
    });

    describe('when currentUser is set', () => {
      beforeEach(() => {
        storeMock.state.currentUser = UserMock();
      });

      describe('when request succeeds', () => {
        let response: MockProxy<AxiosResponse<CurrentUserResponse>>;

        beforeEach(async () => {
          response = mock<AxiosResponse<CurrentUserResponse>>();
          response.data.user = UserMock();
          httpMock.get.mockResolvedValue(response);
          await session.load();
        });

        it('updates isLoadingCurrentUser to true', () => {
          expect(storeMock.update).toBeCalledWith({
            isLoadingCurrentUser: true
          });
        });

        it('makes API request to fetch current user', () => {
          expect(http.get).toBeCalledWith('/api/auth/current');
        });

        it('updates the store', () => {
          expect(storeMock.update).toBeCalledWith({
            currentUser: response.data.user,
            isLoadingCurrentUser: false
          });
        });
      });

      describe('when request fails', () => {
        const error = new Error('API request failed');

        beforeEach(async () => {
          httpMock.get.mockRejectedValue(error);
          await session.load();
        });

        it('resets the store', () => {
          expect(storeMock.reset).toBeCalled();
        });

        it('handles the error', async () => {
          expect(errorsModuleMock.handleErrorQuietly).toBeCalledWith(error);
        });
      });
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

      it('updates the store', () => {
        expect(storeMock.update).toBeCalledWith({
          currentUser: response.data.user
        });
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
        expect(storeMock.update).not.toBeCalled();
        expect(notificationsModuleMock.showNotification).not.toBeCalled();
      });
    });
  });

  describe('signOut()', () => {
    describe('when request succeeds', () => {
      let response: MockProxy<AxiosResponse>;

      beforeEach(async () => {
        response = mock<AxiosResponse>();
        httpMock.post.mockResolvedValue(response);
        await session.signOut();
      });

      it('resets the store', () => {
        expect(storeMock.reset).toBeCalled();
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

      it('resets the store', () => {
        expect(storeMock.reset).toBeCalled();
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

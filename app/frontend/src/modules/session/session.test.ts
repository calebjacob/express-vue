// subject:

import { useSession } from './session';

// utils:

import flushPromises from 'flush-promises';
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
import { Session, SessionModule } from './types';
import { reactive, readonly } from 'vue';
import { useErrors, ErrorsModule } from '@/modules/errors';
import { useTheNotifications, NotificationsModule, NotificationType } from '@/modules/notifications';
import http from '@/services/http';
import { AxiosResponse } from 'axios';
import cookies from 'js-cookie';

// mocks:

jest.mock('@/modules/errors');
const useErrorsMock = mocked(useErrors, true);

jest.mock('@/modules/notifications');
const useTheNotificationsMock = mocked(useTheNotifications, true);

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

      it('makes API requeset', () => {
        expect(httpMock.post).toHaveBeenCalledWith('/api/auth/create', body);
      });

      it('updates the currentUser value', () => {
        expect(session.session.currentUser).toEqual(response.data.user);
      });

      it('shows a notification', () => {
        expect(notificationsModuleMock.showNotification).toHaveBeenCalledWith({
          message: 'Welcome! Your account has been created.',
          type: NotificationType.SUCCESS
        });
      });
    });
  });
});

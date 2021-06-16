import {
  CreateAccountBody,
  CreateAccountResponse,
  CurrentUserResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { Session, SessionModule } from './types';
import { useErrors } from '@/modules/errors';
import { useTheNotifications, NotificationType } from '@/modules/notifications';
import { useState } from '@/modules/state';
import cookies from '@/services/cookies';
import http from '@/services/http';

export function useSession(): SessionModule {
  const { handleErrorQuietly } = useErrors();
  const { showNotification } = useTheNotifications();

  const state = useState<Session>('Session', {
    currentUser: null,
    isLoadingCurrentUser: false
  });

  async function createAccount(body: CreateAccountBody) {
    try {
      const response = await http.post<CreateAccountResponse>('/api/auth/create', body);

      state.update({
        currentUser: response.data.user
      });

      showNotification({
        message: 'Welcome! Your account has been created.',
        type: NotificationType.SUCCESS
      });
    } catch (error) {
      throw error;
    }
  }

  async function load() {
    try {
      if (!cookies.get('isSignedIn')) {
        return;
      }

      state.update({
        isLoadingCurrentUser: true
      });

      const response = await http.get<CurrentUserResponse>('/api/auth/current');

      state.update({
        currentUser: response.data.user
      });
    } catch (error) {
      handleErrorQuietly(error);
    } finally {
      state.update({
        isLoadingCurrentUser: false
      });
    }
  }

  async function signIn(body: SignInBody) {
    try {
      const response = await http.post<SignInResponse>('/api/auth/sign-in', body);

      state.update({
        currentUser: response.data.user
      });

      showNotification({
        message: 'Welcome! You have signed in.',
        type: NotificationType.SUCCESS
      });
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      state.reset();

      showNotification({
        message: 'Goodbye! You have signed out.',
        type: NotificationType.SUCCESS
      });

      await http.post('/api/auth/sign-out');
    } catch (error) {
      handleErrorQuietly(error);
    }
  }

  return {
    createAccount,
    load,
    session: state.state,
    signIn,
    signOut
  };
}

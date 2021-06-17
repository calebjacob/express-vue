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
import { useStore } from '@/modules/store';
import http from '@/services/http';

export function useSession(): SessionModule {
  const { handleErrorQuietly } = useErrors();
  const { showNotification } = useTheNotifications();

  const store = useStore<Session>(
    'Session',
    {
      currentUser: null,
      isLoadingCurrentUser: false
    },
    {
      save: 'local'
    }
  );

  async function createAccount(body: CreateAccountBody) {
    try {
      const response = await http.post<CreateAccountResponse>('/api/auth/create', body);

      store.update({
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
      if (!store.state.currentUser) {
        return;
      }

      store.update({
        isLoadingCurrentUser: true
      });

      const response = await http.get<CurrentUserResponse>('/api/auth/current');

      store.update({
        currentUser: response.data.user,
        isLoadingCurrentUser: false
      });
    } catch (error) {
      store.reset();
      handleErrorQuietly(error);
    }
  }

  async function signIn(body: SignInBody) {
    try {
      const response = await http.post<SignInResponse>('/api/auth/sign-in', body);

      store.update({
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
      store.reset();

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
    resetSession: store.reset,
    session: store.state,
    signIn,
    signOut
  };
}

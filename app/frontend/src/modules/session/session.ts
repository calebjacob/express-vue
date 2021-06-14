import {
  CreateAccountBody,
  CreateAccountResponse,
  CurrentUserResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { User } from 'shared/types/models';
import { Session, SessionModule } from './types';
import { reactive, readonly } from 'vue';
import { useErrors } from '@/modules/errors';
import { useTheNotifications, NotificationType } from '@/modules/notifications';
import cookies from '@/services/cookies';
import http from '@/services/http';

export function useSession(): SessionModule {
  const { handleErrorQuietly } = useErrors();
  const { showNotification } = useTheNotifications();

  const session: Session = reactive({
    currentUser: null,
    isLoadingCurrentUser: false
  });

  async function createAccount(body: CreateAccountBody) {
    try {
      const response = await http.post<CreateAccountResponse>('/api/auth/create', body);
      session.currentUser = response.data.user;

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

      session.isLoadingCurrentUser = true;
      const response = await http.get<CurrentUserResponse>('/api/auth/current');
      session.currentUser = response.data.user;
    } catch (error) {
      handleErrorQuietly(error);
    } finally {
      session.isLoadingCurrentUser = false;
    }
  }

  function setCurrentUser(user: User) {
    session.currentUser = user;
  }

  async function signIn(body: SignInBody) {
    try {
      const response = await http.post<SignInResponse>('/api/auth/sign-in', body);
      session.currentUser = response.data.user;

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
      session.currentUser = null;

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
    session: readonly(session),
    setCurrentUser,
    signIn,
    signOut
  };
}

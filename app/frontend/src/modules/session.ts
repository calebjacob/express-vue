import {
  CreateAccountBody,
  CreateAccountResponse,
  CurrentUserResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { User } from 'shared/types/models';
import { InjectionKey, reactive, readonly } from 'vue';
import { useErrors } from '@/modules/errors';
import { useNotifications, NotificationType } from '@/modules/notifications';
import http from '@/services/http';
import cookies from 'js-cookie';

const SessionModuleKey: InjectionKey<SessionModule> = Symbol('SessionModule');

interface SessionModule {
  load(): Promise<void>;
  createAccount(body: CreateAccountBody): Promise<void>;
  session: Session;
  signIn(body: SignInBody): Promise<void>;
  signOut(): Promise<void>;
}

interface Session {
  currentUser: User | null;
  isLoadingCurrentUser: boolean;
}

const session: Session = reactive({
  currentUser: null,
  isLoadingCurrentUser: false
});

const { handleErrorQuietly } = useErrors();
const { showNotification } = useNotifications();

function useSession(): SessionModule {
  async function createAccount(body: CreateAccountBody) {
    try {
      const response = await http.post<CreateAccountResponse>(
        '/api/auth/create',
        body
      );
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
      session.isLoadingCurrentUser = true;
    }
  }

  async function signIn(body: SignInBody) {
    try {
      const response = await http.post<SignInResponse>(
        '/api/auth/sign-in',
        body
      );
      session.currentUser = response.data.user;

      showNotification({
        message: 'You have signed in!',
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
        message: 'You have signed out.',
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
    signIn,
    signOut
  };
}

export { useSession, SessionModule, SessionModuleKey };

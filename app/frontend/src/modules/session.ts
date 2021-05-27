import { SignInBody, SignInResponse } from 'shared/types/api';
import { InjectionKey, reactive, readonly } from 'vue';
import { useErrors } from '@/modules/errors';
import { useNotifications, NotificationType } from '@/modules/notifications';
import http from '@/services/http';

const SessionModuleKey: InjectionKey<SessionModule> = Symbol('SessionModule');

interface SessionModule {
  load(): Promise<void>;
  session: Session;
  signIn(options: SignInOptions): Promise<void>;
  signOut(): Promise<void>;
}

interface Session {
  currentUser: SignInResponse | null;
  isSigningIn: boolean;
}

interface SignInOptions {
  email: string;
  password: string;
}

const session: Session = reactive({
  currentUser: null,
  isSigningIn: false
});

const { handleError, handleErrorQuietly } = useErrors();
const { showNotification } = useNotifications();

function useSession(): SessionModule {
  async function load() {
    // TODO
  }

  async function signIn({ email, password }: SignInOptions) {
    try {
      session.isSigningIn = true;

      const signInBody: SignInBody = {
        email,
        password
      };

      const response = await http.post<SignInResponse>(
        '/api/auth/sign-in',
        signInBody
      );

      session.currentUser = response.data;

      showNotification({
        message: 'You have signed in!',
        type: NotificationType.SUCCESS
      });
    } catch (error) {
      handleError(error);
    } finally {
      session.isSigningIn = false;
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
    load,
    session: readonly(session),
    signIn,
    signOut
  };
}

export { useSession, SessionModule, SessionModuleKey };

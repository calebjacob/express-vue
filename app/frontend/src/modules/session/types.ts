import { User } from 'shared/types/models';
import { CreateAccountBody, SignInBody } from 'shared/types/api';

export interface SessionModule {
  load(): Promise<void>;
  createAccount(body: CreateAccountBody): Promise<void>;
  session: Session;
  signIn(body: SignInBody): Promise<void>;
  signOut(): Promise<void>;
}

export interface Session {
  currentUser: User | null;
  isLoadingCurrentUser: boolean;
}

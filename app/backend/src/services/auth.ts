import { CreateAccountBody } from 'shared/types/api';
import { User } from 'shared/types/models';
import logger from '@/services/logger';
import timer from '@/helpers/timer';

export enum AuthErrors {
  CONFLICT = 'Email Registration Conflict',
  INVALID = 'Invalid Auth Credentials'
}

export interface AuthTokens {
  accessToken: string | null | undefined;
  refreshToken: string | null | undefined;
}

interface CreateAccountOptions {
  data: CreateAccountBody;
}

interface SignInOptions {
  email: string;
  password: string;
}

interface SignInSuccess {
  tokens: AuthTokens;
  user: User;
}

interface SignOutOptions {
  tokens: AuthTokens;
}

interface VerifyOptions {
  tokens: AuthTokens;
}

interface VerifySuccess {
  tokens: AuthTokens;
  user: User;
}

const mockUser = {
  email: 'frodo@baggins.com',
  fullName: 'Frodo Baggins',
  id: '12345'
};

async function createAccount({
  data
}: CreateAccountOptions): Promise<SignInSuccess> {
  try {
    /*
      NOTE: This logic is just for demo purposes and should be replaced with an 
      actual user registration flow that uses something like bcrypt to hash
      the user's password.
    */

    await timer(150);

    logger.info(
      'Creating new user. The following info should be saved to their new account:',
      {
        ...data
      }
    );

    if (data.email === 'bilbo@baggins.com') {
      throw new Error(AuthErrors.CONFLICT);
    }

    return await signIn({
      email: data.email,
      password: data.password
    });
  } catch (error) {
    throw error;
  }
}

async function signIn({
  email,
  password
}: SignInOptions): Promise<SignInSuccess> {
  try {
    /*
      NOTE: This logic is just for demo purposes and should be replaced with an 
      actual email/password/user lookup auth flow using something like bcrypt.
    */

    await timer(150);

    logger.info('Signing user in with the following credentials:', {
      email,
      password
    });

    if (email === 'frodo@baggins.com' && password === 'shire') {
      return {
        tokens: {
          accessToken: 'ACCESS_TOKEN_123',
          refreshToken: 'REFRESH_TOKEN_123'
        },
        user: mockUser
      };
    } else {
      throw new Error(AuthErrors.INVALID);
    }
  } catch (error) {
    throw error;
  }
}

async function signOut({ tokens }: SignOutOptions): Promise<void> {
  try {
    /*
      NOTE: This logic is just for demo purposes and should be replaced with 
      logic that actually invalidates the passed tokens.
    */

    await timer(150);

    logger.info(
      'Signing out user. The following tokens should be invalidated:',
      {
        ...tokens
      }
    );
  } catch (error) {
    throw error;
  }
}

async function verify({ tokens }: VerifyOptions): Promise<VerifySuccess> {
  try {
    await timer(150);

    /*
      NOTE: This logic is just for demo purposes and should be replaced with an 
      actual access token verification, refresh token, and user fetch flow.
    */

    if (tokens.accessToken) {
      return {
        tokens: {
          accessToken: 'ACCESS_TOKEN_123',
          refreshToken: 'REFRESH_TOKEN_123'
        },
        user: mockUser
      };
    }

    throw new Error(AuthErrors.INVALID);
  } catch (error) {
    throw error;
  }
}

export default { createAccount, signIn, signOut, verify };

import { ApiErrorCode, CreateAccountBody } from 'shared/types/api';
import { Response } from '@/types/routes';
import { User } from 'shared/types/models';
import config from '@/config';
import logger from '@/services/logger';
import timer from '@/helpers/timer';

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

interface UpdateCookiesOptions {
  res: Response;
  tokens: AuthTokens | null;
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

async function createAccount({ data }: CreateAccountOptions): Promise<SignInSuccess> {
  try {
    /*
      NOTE: This logic is just for demo purposes and should be replaced with an 
      actual user registration flow that uses something like bcrypt to hash
      the user's password.
    */

    await timer(150);

    logger.info('Creating new user. The following info should be saved to their new account:', {
      ...data
    });

    if (data.email === 'bilbo@baggins.com') {
      throw new Error(ApiErrorCode.EMAIL_CONFLICT);
    }

    return await signIn({
      email: data.email,
      password: data.password
    });
  } catch (error) {
    throw error;
  }
}

async function signIn({ email, password }: SignInOptions): Promise<SignInSuccess> {
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

    if (email === 'frodo@baggins.com' && password === 'the_shire') {
      return {
        tokens: {
          accessToken: 'ACCESS_TOKEN_123',
          refreshToken: 'REFRESH_TOKEN_123'
        },
        user: mockUser
      };
    } else {
      throw new Error(ApiErrorCode.INVALID_AUTH);
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

    logger.info('Signing out user. The following tokens should be invalidated:', {
      ...tokens
    });
  } catch (error) {
    throw error;
  }
}

function updateCookies({ res, tokens }: UpdateCookiesOptions): void {
  if (tokens && tokens.accessToken && tokens.refreshToken) {
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: config.environment !== 'local',
      secure: config.environment !== 'local',
      signed: true
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: config.environment !== 'local',
      secure: config.environment !== 'local',
      signed: true
    });
  } else {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
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

    throw new Error(ApiErrorCode.INVALID_AUTH);
  } catch (error) {
    throw error;
  }
}

export default { createAccount, signIn, signOut, updateCookies, verify };

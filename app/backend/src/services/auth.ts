import config from '@/config';
import timer from '@/helpers/timer';
import { Response } from '@/routes/types';
import { RegisterBody, RegisterResponse, SignInResponse } from 'shared/types';

export enum AuthErrors {
  CONFLICT = 'Conflict',
  INVALID = 'Invalid'
}

interface RefreshOptions {
  currentRefreshToken: string;
  res: Response;
}

interface RegisterOptions {
  body: RegisterBody;
  res: Response;
}

interface SignInOptions {
  email: string;
  password: string;
  res: Response;
}

interface SignOutOptions {
  res: Response;
}

function clearCookies(res: Response) {
  res.clearCookie('accessToken');
  res.clearCookie('isSignedIn');
  res.clearCookie('refreshToken');
}

function saveCookies(accessToken: string, refreshToken: string, res: Response) {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: config.environment !== 'local',
    secure: config.environment !== 'local',
    signed: true
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: config.environment !== 'local',
    secure: config.environment !== 'local',
    signed: true
  });

  res.cookie('isSignedIn', 'true');
}

export async function refresh({
  currentRefreshToken,
  res
}: RefreshOptions): Promise<SignInResponse> {
  try {
    await timer(150);

    if (currentRefreshToken) {
      /*
        NOTE: This logic is just for demo purposes and should be replaced with an 
        actual refresh auth token flow.
      */

      const accessToken = 'NEW_ACCESS_TOKEN_123';
      const refreshToken = 'NEW_REFRESH_TOKEN_123';

      saveCookies(accessToken, refreshToken, res);

      return {
        email: 'frodo@baggins.com',
        fullName: 'Frodo Baggins',
        id: '12345'
      };
    } else {
      throw new Error(AuthErrors.INVALID);
    }
  } catch (error) {
    throw error;
  }
}

export async function register({
  body,
  res
}: RegisterOptions): Promise<RegisterResponse> {
  try {
    await timer(150);

    if (body.email !== 'gandalf@grey.com') {
      /*
        NOTE: This logic is just for demo purposes and should be replaced with an 
        actual email conflict lookup and password encryption flow using something
        like bcrypt.
      */

      const accessToken = 'ACCESS_TOKEN_123';
      const refreshToken = 'REFRESH_TOKEN_123';

      saveCookies(accessToken, refreshToken, res);

      return {
        email: body.email,
        fullName: body.fullName,
        id: '12345'
      };
    } else {
      throw new Error(AuthErrors.CONFLICT);
    }
  } catch (error) {
    throw error;
  }
}

export async function signIn({
  email,
  password,
  res
}: SignInOptions): Promise<SignInResponse> {
  try {
    await timer(150);

    if (email && password === 'shire') {
      /*
        NOTE: This logic is just for demo purposes and should be replaced with an 
        actual email/password lookup auth flow using something like bcrypt.
      */

      const accessToken = 'ACCESS_TOKEN_123';
      const refreshToken = 'REFRESH_TOKEN_123';

      saveCookies(accessToken, refreshToken, res);

      return {
        email: 'frodo@baggins.com',
        fullName: 'Frodo Baggins',
        id: '12345'
      };
    } else {
      throw new Error(AuthErrors.INVALID);
    }
  } catch (error) {
    throw error;
  }
}

export async function signOut({ res }: SignOutOptions): Promise<void> {
  try {
    clearCookies(res);
    await timer(150);
  } catch (error) {
    throw error;
  }
}

export default { refresh, register, signIn, signOut };

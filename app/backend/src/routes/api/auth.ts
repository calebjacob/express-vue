import config from '@/config';
import timer from '@/helpers/timer';
import logger from '@/services/logger';
import { apiErrorHandler } from '@/services/errors';
import { Request, Response } from 'express';
import { SignInBody, SignInResponse } from 'shared/types';

function clearCookies(res: Response) {
  res.clearCookie('accessToken');
  res.clearCookie('isSignedIn');
  res.clearCookie('refreshToken');
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

async function signIn(
  req: Request<undefined, undefined, SignInBody>,
  res: Response<SignInResponse>
): Promise<void> {
  try {
    const accessToken = 'ACCESS_TOKEN_123';
    const refreshToken = 'REFRESH_TOKEN_123';

    logger.info('Sign in attempted with credentials:', {
      email: req.body.email,
      password: req.body.password
    });

    await timer(300);

    saveCookies(accessToken, refreshToken, res);

    res.json({
      email: 'frodo@baggins.com',
      fullName: 'Frodo Baggins',
      id: '12345'
    });
  } catch (error) {
    apiErrorHandler({
      errors: [
        {
          error,
          message: 'Your email or password is invalid.'
        }
      ],
      res,
      status: 401
    });
  }
}

async function signOut(req: Request, res: Response): Promise<void> {
  try {
    clearCookies(res);
    await timer(300);
  } catch (error) {
    logger.error(error);
  }

  res.json({});
}

export default {
  signIn,
  signOut
};

import {
  ApiErrorCode,
  CurrentUserResponse,
  CreateAccountBody,
  CreateAccountResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { Handler, Response, Request } from '@/types/routes';
import errorService from '@/services/errors';
import authService from '@/services/auth';
import logger from '@/services/logger';

const createAccount: Handler = async (
  req: Request<CreateAccountBody>,
  res: Response<CreateAccountResponse>
): Promise<void> => {
  try {
    const { tokens, user } = await authService.createAccount({
      data: req.body
    });

    authService.updateCookies({
      tokens,
      res
    });

    res.json({
      user
    });
  } catch (error) {
    if (error.message === ApiErrorCode.EMAIL_CONFLICT) {
      errorService.apiErrorHandler({
        code: ApiErrorCode.EMAIL_CONFLICT,
        message: 'The email you entered is already in use.',
        res,
        status: 409
      });
    } else {
      errorService.apiErrorHandler({
        error,
        res
      });
    }
  }
};

const currentUser: Handler = async (req: Request, res: Response<CurrentUserResponse>): Promise<void> => {
  try {
    if (req.currentUser) {
      res.json({
        user: req.currentUser
      });
    } else {
      throw new Error('Current user not found.');
    }
  } catch (error) {
    errorService.apiErrorHandler({
      error,
      res
    });
  }
};

const signIn: Handler = async (req: Request<SignInBody>, res: Response<SignInResponse>): Promise<void> => {
  try {
    const { tokens, user } = await authService.signIn({
      email: req.body.email,
      password: req.body.password
    });

    authService.updateCookies({
      tokens,
      res
    });

    res.json({
      user
    });
  } catch (error) {
    if (error.message === ApiErrorCode.INVALID_AUTH) {
      errorService.apiErrorHandler({
        code: ApiErrorCode.INVALID_AUTH,
        message: 'The email or password you entered is incorrect.',
        res,
        status: 400
      });
    } else {
      errorService.apiErrorHandler({
        error,
        res
      });
    }
  }
};

const signOut: Handler = async (req: Request, res: Response): Promise<void> => {
  try {
    await authService.signOut({
      tokens: {
        accessToken: req.signedCookies.accessToken,
        refreshToken: req.signedCookies.refreshToken
      }
    });
  } catch (error) {
    logger.error(error);
  }

  authService.updateCookies({
    tokens: null,
    res
  });

  res.json({});
};

export default {
  createAccount,
  currentUser,
  signIn,
  signOut
};

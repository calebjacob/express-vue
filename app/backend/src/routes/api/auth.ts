import {
  ApiErrorCode,
  CurrentUserResponse,
  CreateAccountBody,
  CreateAccountResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { Handler, Response, Request } from '@/types/routes';
import apiErrorHandler from '@/helpers/api-error-handler';
import authService from '@/services/auth';
import logger from '@/services/logger';
import updateAuthCookies from '@/helpers/update-auth-cookies';

const createAccount: Handler = async (
  req: Request<CreateAccountBody>,
  res: Response<CreateAccountResponse>
): Promise<void> => {
  try {
    const { tokens, user } = await authService.createAccount({
      data: req.body
    });

    updateAuthCookies({
      tokens,
      res
    });

    res.json({
      user
    });
  } catch (error) {
    if (error.message === ApiErrorCode.EMAIL_CONFLICT) {
      apiErrorHandler({
        code: ApiErrorCode.EMAIL_CONFLICT,
        message: 'The email you entered is already in use.',
        res,
        status: 409
      });
    } else {
      apiErrorHandler({
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
    apiErrorHandler({
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

    updateAuthCookies({
      tokens,
      res
    });

    res.json({
      user
    });
  } catch (error) {
    if (error.message === ApiErrorCode.INVALID_AUTH) {
      apiErrorHandler({
        code: ApiErrorCode.INVALID_AUTH,
        message: 'The email or password you entered is incorrect.',
        res,
        status: 400
      });
    } else {
      apiErrorHandler({
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

  updateAuthCookies({
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

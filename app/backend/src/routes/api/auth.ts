import {
  CurrentUserResponse,
  RegisterBody,
  RegisterResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { Handler, Response, Request } from '@/types/routes';
import apiErrorHandler from '@/helpers/api-error-handler';
import authService, { AuthErrors } from '@/services/auth';
import logger from '@/services/logger';
import updateAuthCookies from '@/helpers/update-auth-cookies';

const currentUser: Handler = async (
  req: Request,
  res: Response<CurrentUserResponse>
): Promise<void> => {
  try {
    if (req.currentUser) {
      res.json(req.currentUser);
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

const register: Handler = async (
  req: Request<RegisterBody>,
  res: Response<RegisterResponse>
): Promise<void> => {
  try {
    const { tokens, user } = await authService.register({
      data: req.body
    });

    updateAuthCookies({
      tokens,
      res
    });

    res.json(user);
  } catch (error) {
    if (error.message === AuthErrors.CONFLICT) {
      apiErrorHandler({
        message: 'The email you entered is already in use.',
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

const signIn: Handler = async (
  req: Request<SignInBody>,
  res: Response<SignInResponse>
): Promise<void> => {
  try {
    const { tokens, user } = await authService.signIn({
      email: req.body.email,
      password: req.body.password
    });

    updateAuthCookies({
      tokens,
      res
    });

    res.json(user);
  } catch (error) {
    if (error.message === AuthErrors.INVALID) {
      apiErrorHandler({
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
  currentUser,
  register,
  signIn,
  signOut
};

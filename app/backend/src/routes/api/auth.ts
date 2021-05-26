import { Handler, Response, Request } from '@/routes/types';
import {
  RegisterBody,
  RegisterResponse,
  SignInBody,
  SignInResponse
} from 'shared/types';
import { apiErrorHandler } from '@/services/errors';
import { logError } from '@/services/logger';
import authService, { AuthErrors } from '@/services/auth';

const register: Handler = async (
  req: Request<RegisterBody>,
  res: Response<RegisterResponse>
): Promise<void> => {
  try {
    const user = await authService.register({
      body: req.body,
      res
    });

    res.json(user);
  } catch (error) {
    if (error.message === AuthErrors.CONFLICT) {
      apiErrorHandler({
        error,
        message: 'Failed to create your account.',
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

const signIn: Handler = async (
  req: Request<SignInBody>,
  res: Response<SignInResponse>
): Promise<void> => {
  try {
    const user = await authService.signIn({
      email: req.body.email,
      password: req.body.email,
      res
    });

    res.json(user);
  } catch (error) {
    if (error.message === AuthErrors.INVALID) {
      apiErrorHandler({
        error,
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
      res
    });
  } catch (error) {
    logError(error);
  }

  res.json({});
};

export default {
  register,
  signIn,
  signOut
};

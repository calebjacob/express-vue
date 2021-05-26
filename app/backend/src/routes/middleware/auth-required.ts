import { Middleware, Next, Response, Request } from '@/routes/types';
import { apiErrorHandler } from '@/services/errors';
import { refresh } from '@/services/auth';

const authRequired: Middleware = async (
  req: Request,
  res: Response,
  next: Next
): Promise<void> => {
  /*
    NOTE: This logic is just for demo purposes. This should be
    replaced with logic to verify that the user's access token
    is valid. If it expired, a refresh should be attempted.
  */

  try {
    if (req.signedCookies.accessToken) {
      next();
    } else {
      await refresh({
        currentRefreshToken: req.signedCookies.refreshToken,
        res
      });
    }
  } catch (error) {
    apiErrorHandler({
      code: 'INVALID_AUTH',
      message: 'Your session has expired. Please sign in to continue.',
      res,
      status: 401
    });
  }
};

export default authRequired;

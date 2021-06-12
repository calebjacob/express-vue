import { Middleware, Next, Response, Request } from '@/types/routes';
import authService from '@/services/auth';
import logger from '@/services/logger';
import updateAuthCookies from '@/helpers/update-auth-cookies';

function continueAsGuest(req: Request, res: Response, next: Next) {
  updateAuthCookies({
    tokens: null,
    res
  });

  req.currentUser = null;

  next();
}

const currentUser: Middleware = async (req: Request, res: Response, next: Next): Promise<void> => {
  try {
    const accessToken = req.signedCookies.accessToken;
    const refreshToken = req.signedCookies.refreshToken;

    if (accessToken && refreshToken) {
      const { tokens, user } = await authService.verify({
        tokens: {
          accessToken,
          refreshToken
        }
      });

      updateAuthCookies({
        tokens,
        res
      });

      req.currentUser = user;

      next();

      return;
    }

    continueAsGuest(req, res, next);
  } catch (error) {
    logger.error(error);
    continueAsGuest(req, res, next);
  }
};

export default currentUser;

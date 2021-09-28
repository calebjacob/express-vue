import { Middleware, Next, Response, Request } from '@/types/routes';
import errorService from '@/services/errors';

const authRequired: Middleware = (req: Request, res: Response, next: Next): void => {
  if (req.currentUser) {
    next();
  } else {
    errorService.apiErrorHandler({
      message: 'Your session has expired. Please sign in to continue.',
      res,
      status: 401
    });
  }
};

export default authRequired;

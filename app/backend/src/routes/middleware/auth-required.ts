import { Middleware, Next, Response, Request } from '@/types/routes';
import apiErrorHandler from '@/helpers/api-error-handler';

const authRequired: Middleware = (
  req: Request,
  res: Response,
  next: Next
): void => {
  if (req.currentUser) {
    next();
  } else {
    apiErrorHandler({
      message: 'Your session has expired. Please sign in to continue.',
      res,
      status: 401
    });
  }
};

export default authRequired;

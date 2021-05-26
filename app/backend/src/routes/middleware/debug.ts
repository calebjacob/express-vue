/* eslint-disable @typescript-eslint/no-unused-vars */

import { logError } from '@/services/logger';
import { MiddlewareDebug, Next, Response, Request } from '@/routes/types';

const debug: MiddlewareDebug = (
  error: Error,
  req: Request,
  res: Response,
  next: Next
): void => {
  logError(error);
  res.status(500);
  res.send('500 - INTERNAL ERROR');
};

export default debug;

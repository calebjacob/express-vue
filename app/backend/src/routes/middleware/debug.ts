/* eslint-disable @typescript-eslint/no-unused-vars */

import { MiddlewareDebug, Next, Response, Request } from '@/types/routes';
import logger from '@/services/logger';

const debug: MiddlewareDebug = (error: Error, req: Request, res: Response, next: Next): void => {
  logger.error(error);
  res.status(500);
  res.send('500 - INTERNAL ERROR');
};

export default debug;

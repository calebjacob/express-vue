/* eslint-disable @typescript-eslint/no-unused-vars */

import { Express } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    foobar?: boolean;
  }
}

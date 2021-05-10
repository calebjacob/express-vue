import { Request, Response, NextFunction } from 'express';

function debug(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.dir(error, {
    depth: null,
    colors: true
  });

  next(error);
}

export default debug;

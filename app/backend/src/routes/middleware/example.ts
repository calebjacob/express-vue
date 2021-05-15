import { Request, Response, NextFunction } from 'express';

function example(req: Request, res: Response, next: NextFunction): void {
  req.foobar = true;

  next();
}

export default example;

import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction
} from 'express';

type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch';

export type Response<ResBody = any> = ExpressResponse<ResBody>;
export type Request<ReqBody = any> = ExpressRequest<any, any, ReqBody>;
export type Next = ExpressNextFunction;

export type Handler = (req: Request, res: Response) => any;

export type Middleware = (req: Request, res: Response, next: Next) => any;

export type MiddlewareDebug = (
  error: Error,
  req: Request,
  res: Response,
  next: Next
) => any;

export type Route = {
  method: Method;
  path: string | RegExp;
  middleware?: Middleware[];
  handler: Handler;
};

import { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from 'express';
import { User } from 'shared/types/models';

export type Handler = (req: Request, res: Response) => any;

type Method = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch';

export type Middleware = (req: Request, res: Response, next: Next) => any;

export type MiddlewareDebug = (error: Error, req: Request, res: Response, next: Next) => any;

export type Next = ExpressNextFunction;

export type Response<ResBody = any> = ExpressResponse<ResBody>;

export type Request<ReqBody = any> = ExpressRequest<any, any, ReqBody> & {
  currentUser?: User | null;
};

export type Route = {
  method: Method;
  path: string | RegExp;
  middleware?: Middleware[];
  handler: Handler;
};

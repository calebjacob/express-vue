import { Request, Response } from 'express';

function post(req: Request, res: Response): void {
  res.clearCookie('accessToken');
  res.clearCookie('isSignedIn');
  res.clearCookie('refreshToken');

  res.json({});
}

export default {
  post
};

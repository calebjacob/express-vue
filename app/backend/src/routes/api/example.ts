import { Request, Response } from 'express';

function get(req: Request, res: Response): void {
  res.json({
    color: 'blue',
    foobar: req.foobar,
    miles: 7000,
    thing: 'car'
  });
}

function post(req: Request, res: Response): void {
  res.json({
    email: 'frodo@baggins.com',
    fullName: 'Frodo Baggins',
    id: '12345'
  });
}

export default {
  get,
  post
};

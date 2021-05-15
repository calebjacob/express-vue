import { Request, Response } from 'express';
import appRoot from 'app-root-path';

function get(req: Request, res: Response): void {
  res.sendFile(`${appRoot}/app/frontend/dist/index.html`);
}

export default {
  get
};

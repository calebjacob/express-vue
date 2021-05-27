import { Handler, Response, Request } from '@/types/routes';
import appRoot from 'app-root-path';

const get: Handler = (req: Request, res: Response): void => {
  res.sendFile(`${appRoot}/app/frontend/dist/index.html`);
};

export default {
  get
};

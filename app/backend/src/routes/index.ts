import { Express } from 'express';
import api from '@/routes/api';
import currentUser from '@/routes/middleware/current-user';
import debug from '@/routes/middleware/debug';
import pages from '@/routes/pages';

function routes(app: Express): void {
  api.forEach((route) => {
    const { method, path, middleware = [], handler } = route;
    app[method](path, currentUser, ...middleware, handler);
  });

  pages.forEach((route) => {
    const { method, path, middleware = [], handler } = route;
    app[method](path, ...middleware, handler);
  });

  app.use(debug);
}

export default routes;

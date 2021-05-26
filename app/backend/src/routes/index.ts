import { Express } from 'express';
import api from './api';
import debug from './middleware/debug';
import pages from './pages';

function routes(app: Express): void {
  const routes = [...api, ...pages];

  routes.forEach((route) => {
    const { method, path, middleware = [], handler } = route;
    app[method](path, ...middleware, handler);
  });

  app.use(debug);
}

export default routes;

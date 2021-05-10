import express, { Express, Router } from 'express';
import api from './api';
import middleware from './middleware';
import pages from './pages';

interface Routers {
  public: Router;
}

function routes(app: Express): void {
  const routers: Routers = {
    public: express.Router()
  };

  middleware(routers);
  api(routers);
  pages(routers);

  app.use('/', routers.public);
}

export default routes;

export { Routers };

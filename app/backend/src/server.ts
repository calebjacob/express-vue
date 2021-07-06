import appRoot from 'app-root-path';
import compression from 'compression';
import config from '@/config';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import logger from '@/services/logger';
import routes from '@/routes';

export function createServer(): Express {
  const app = express();

  app.use(express.json());

  app.use(
    express.urlencoded({
      extended: true
    })
  );

  app.use(compression());

  app.use(
    express.static(`${appRoot}/app/public`, {
      index: false
    })
  );

  app.use(
    express.static(`${appRoot}/app/frontend/dist`, {
      index: false
    })
  );

  app.use(cookieParser(config.cookieSecret));

  routes(app);

  app.listen(config.port);

  if (config.environment === 'local') {
    logger.info(`App running at: http://localhost:${config.port}`);
  }

  return app;
}

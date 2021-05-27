// Enable aliases:
// https://rockyj.in/2019/06/29/path-alias-typescript.html

/* eslint-disable */
import moduleAlias from 'module-alias';
moduleAlias.addAlias('@', __dirname);
moduleAlias.addAlias('shared', __dirname.replace('backend/src', 'shared'));
/* eslint-enable */

// Require all dependencies:

import appRoot from 'app-root-path';
import compression from 'compression';
import config from '@/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from '@/services/logger';
import routes from '@/routes';

// Create express app instance:

const app = express();

// Configure general app settings and functionality:

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

// Set up the routes:

routes(app);

// Run the app:

app.listen(config.port);

if (config.environment === 'local') {
  logger.info(`App running at: http://localhost:${config.port}`);
}

// Export the app:

export default app;

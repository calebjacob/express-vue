// Enable aliases:
// https://rockyj.in/2019/06/29/path-alias-typescript.html

/* eslint-disable */
import moduleAlias from 'module-alias';
moduleAlias.addAlias('@', __dirname);
/* eslint-enable */

// Require all dependencies:

import appRoot from 'app-root-path';
import compression from 'compression';
import config from '@/config';
import debug from '@/routes/middleware/debug';
import express from 'express';
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

app.use(express.static(`${appRoot}/app/public`));
app.use(express.static(`${appRoot}/app/public/dist`));

// Set up the routes:

routes(app);

// Set up error handling and debug logging:

app.use(debug);

// Run the app:

app.listen(config.port);

if (config.environment === 'local') {
  console.log(`App running at: localhost:${config.port}`);
}

// Export the app:

export default app;

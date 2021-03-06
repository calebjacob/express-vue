// Require all dependencies:

const appRoot = require('app-root-path');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('./config');
const debug = require('./routes/middleware/debug');
const express = require('express');
const routes = require('./routes');

// Create express app instance:

const app = express();

// Configure general app settings and functionality:

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
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

module.exports = app;

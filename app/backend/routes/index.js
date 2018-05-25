const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const pages = require('./pages');



function routes(app) {
  const routers = {
    public: express.Router()
  };

  middleware(routers);
  api(routers);
  pages(routers);

  app.use('/', routers.public);
}



module.exports = routes;

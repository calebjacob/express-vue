let express = require('express');
let api = require('./api');
let pages = require('./pages');



module.exports = function(app) {
  let routers = {
    public: express.Router()
  };

  api(routers);
  pages(routers);

  app.use('/', routers.public);
};

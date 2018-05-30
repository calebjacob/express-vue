const appRoot = require('app-root-path');



function get(req, res, next) {
  res.sendFile(`${appRoot}/app/public/dist/index.html`);
}



module.exports = {
  get
};

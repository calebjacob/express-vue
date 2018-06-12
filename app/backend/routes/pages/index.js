const vue = require('./vue');



function pages(routers) {
  routers.public.get(/^(?!\/api).*/, vue.get);
}



module.exports = pages;

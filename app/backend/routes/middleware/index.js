const example = require('./example');



function middleware(routers) {
  routers.public.use(example);
}



module.exports = middleware;

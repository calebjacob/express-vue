const example = require('./example');

function api(routers) {
  routers.public.get('/api/example', example.get);
  routers.public.post('/api/example', example.post);
}

module.exports = api;

const api = {
  example: require('./example')
};



module.exports = function(routers) {
  routers.public.get('/api/example', api.example.get);
};

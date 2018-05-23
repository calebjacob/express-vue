let pages = {
  vue: require('./vue')
};



module.exports = function(routers) {
  routers.public.get(/^(?!\/api).*/, pages.vue.get);
};

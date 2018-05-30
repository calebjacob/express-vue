const path = require('path');



module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].template = path.resolve('./app/frontend/index.html');
        return args;
      });

    config
      .plugin('copy')
      .tap((args) => {
        args[0][0].from = path.resolve('./app/frontend/index.html');
        return args;
    });
  },

  configureWebpack: {
    entry: {
      app: './app/frontend/js/index.js'
    },

    performance: false,

    resolve: {
      alias: {
        '@': path.resolve('./app/frontend/js')
      }
    }
  },

  outputDir: 'app/public/dist',

  lintOnSave: false
};

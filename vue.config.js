const path = require('path');



module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].template = path.resolve('./app/ui/index.html');
        return args;
      });

    config
      .plugin('copy')
      .tap((args) => {
        args[0][0].from = path.resolve('./app/ui/index.html');
        return args;
      });
  },

  configureWebpack: {
    entry: {
      app: './app/ui/js/main.js'
    },

    performance: false,

    resolve: {
      alias: {
        '@': path.resolve('./app/ui/js')
      }
    }
  },

  outputDir: 'app/dist',

  lintOnSave: false
};

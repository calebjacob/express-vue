/* eslint-disable */
const path = require('path');
const dotenv = require('dotenv');
/* eslint-enable */

const config = dotenv.config();
const port = config.parsed.PORT;

module.exports = {
  devServer: {
    proxy: `http://localhost:${port}`
  },

  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].template = path.resolve('./app/frontend/index.html');
      return args;
    });

    config.plugin('fork-ts-checker').tap((args) => {
      args[0].typescript.configFile = './app/frontend/tsconfig.json';
      return args;
    });
  },

  configureWebpack: {
    entry: {
      app: './app/frontend/src/index'
    },

    performance: false,

    resolve: {
      alias: {
        '@': path.resolve('./app/frontend/src')
      }
    }
  },

  outputDir: 'app/public/dist',

  lintOnSave: false
};

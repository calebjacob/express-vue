const environment = process.env.NODE_ENV || 'local';
const port = process.env.PORT || '1234';

const globalConfig = {
  port: port,
  environment: environment
};

const environmentSpecificConfig = {
  local: {
    exampleKey: '123foo'
  },
  production: {
    exampleKey: '456bar'
  }
};

const config = Object.assign(globalConfig, environmentSpecificConfig[environment]);



module.exports = config;

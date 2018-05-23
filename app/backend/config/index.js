let environment = process.env.NODE_ENV || 'local';
let port = process.env.PORT || '1234';

let globalConfig = {
  port: port,
  environment: environment
};

let environmentSpecificConfig = {
  local: {},
  production: {}
};

let config = Object.assign(globalConfig, environmentSpecificConfig[environment]);



module.exports = config;

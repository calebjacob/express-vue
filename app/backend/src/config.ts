import dotenv from 'dotenv';

const { parsed = {} } = dotenv.config();

export default {
  environment: parsed.ENVIRONMENT,
  port: parsed.PORT
};

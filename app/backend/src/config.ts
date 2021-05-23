import dotenv from 'dotenv';

const { parsed = {} } = dotenv.config();

export default {
  cookieSecret: parsed.COOKIE_SECRET,
  environment: parsed.ENVIRONMENT,
  port: parsed.PORT
};

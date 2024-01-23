import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().default(3000).asPortNumber(),
  API_NAME: get('API_NAME').required().asString(),
  API_URL: get('API_URL').required().asString(),
  MONGO_DB_URL: get('MONGO_DB_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  CLOUD_NAME: get('CLOUD_NAME').required().asString(),
  API_KEY: get('API_KEY').required().asString(),
  API_SECRET: get('API_SECRET').required().asString(),
};

import { PoolOptions } from 'mysql2';
import { config } from 'dotenv';

config({
  path: './.env',
});

const isProduction: boolean = process.env.IS_PRODUCTION === 'true' || false;

console.log({ isProduction });

export const options: PoolOptions = {
  host: isProduction ? process.env.DB_HOST! : 'localhost',
  database: isProduction ? process.env.DB_NAME! : 'sistema',
  port: isProduction ? parseInt(process.env.DB_PORT!) : 3306,
  user: isProduction ? process.env.DB_USER! : 'root',
  password: isProduction ? process.env.DB_PASSWORD! : 'root',
};

export default options;

import { PoolOptions } from 'mysql2';

const isProduction: boolean = process.env.NODE_ENV === 'production' || false;

export const options: PoolOptions = {
  host: isProduction ? process.env.DB_PORT! : 'localhost',
  database: isProduction ? process.env.DB_NAME! : 'sistema',
  port: isProduction ? parseInt(process.env.DB_PORT!) : 3306,
  user: isProduction ? process.env.DB_USER! : 'root',
  password: isProduction ? process.env.DB_PASSWORD! : 'root',
};

export default options;

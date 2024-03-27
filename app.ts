import Server from './src/config/server';
import { config } from 'dotenv';

config({ path: './.env' });

const isProduction = process.env.NODE_ENV === 'production' || false;

const server: Server = new Server({
  port: isProduction ? process.env.PORT! : 80,
});

server.listen();

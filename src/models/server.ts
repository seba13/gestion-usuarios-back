import express from 'express';
import { config } from 'dotenv';
import indexRouter from '../routes';

// import { join, dirname } from "path";

// siempre ./ sera referenciado a la raiz del proyecto
config({ path: './.env' });

export class Server {
  port: string | number;
  app;

  constructor() {
    this.port = process.env.PORT || '5000';
    this.app = express();

    this.middlewares();
  }

  middlewares() {
    this.app.use(indexRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor ejecutandose en puerto', this.port);
    });
  }
}

export default Server;

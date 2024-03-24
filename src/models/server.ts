import express from 'express';

import indexRouter from '../routes';
import pool from '../config/db';
import { RowDataPacket } from 'mysql2';
// import { join, dirname } from "path";

// siempre ./ sera referenciado a la raiz del proyecto

export class Server {
  port: string | number;
  app;

  constructor({ port }: { port: string | number }) {
    this.app = express();
    this.port = port;
    this.middlewares();

    pool.query<RowDataPacket[]>('select 1+1 as sum', (err, fields) => {
      console.log('sum:', fields[0].sum);
    });
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

import express from 'express';
import { test, usuarios } from '../routes';
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

    // pool.query<RowDataPacket[]>('select 1+1 as sum', (err, fields) => {
    //   console.log('sum:', fields[0].sum);
    // });
  }

  middlewares() {
    // console.log(test);
    // INSCRIPCION DE ROUTERS ACA
    this.app.use(test);
    this.app.use(usuarios);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor ejecutandose en puerto', this.port);
    });
  }
}

export default Server;

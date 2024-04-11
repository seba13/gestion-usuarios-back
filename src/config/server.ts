import express from 'express';
import { loginRouter, usersRouter } from '../routes';
// import pool from '../config/db';
// import { RowDataPacket } from 'mysql2';
// import { join, dirname } from "path";

// siempre ./ sera referenciado a la raiz del proyecto

export class Server {
  port: string | number;
  app;

  constructor({ port }: { port: string | number }) {
    this.app = express();
    this.port = port;
    this.middlewares();
  }

  middlewares() {
    this.app.set('trust proxy', true);
    this.app.use(express.json());
    this.app.use(usersRouter);
    this.app.use(loginRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor ejecutandose en: http://localhost:', this.port);
    });
  }
}

export default Server;

import express from 'express';
import { authRouter, usersRouter, personsRouter } from '../routes';

import cors from 'cors';

export class Server {
  port: string | number;
  app: express.Application;

  constructor({ port }: { port: string | number }) {
    this.app = express();
    this.port = port;
    this.middlewares();
  }

  middlewares() {
    this.app.set('trust proxy', true);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(usersRouter);
    this.app.use(personsRouter);
    this.app.use(authRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor ejecutandose en: http://localhost:', this.port);
    });
  }
}

export default Server;

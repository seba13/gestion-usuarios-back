import express from 'express';
import {
  authRouter,
  usersRouter,
  personsRouter,
  employeeRouter,
} from '../routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
    this.app.use(cookieParser());
    this.app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
    this.app.use(express.json());
    this.app.use(usersRouter);
    this.app.use(employeeRouter);
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

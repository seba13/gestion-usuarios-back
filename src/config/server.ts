import { config } from 'dotenv';
import express from 'express';
import {
  authRouter,
  usersRouter,
  personsRouter,
  employeeRouter,
  communesRouter,
  lettersRouter,
} from '../routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import chargesRoutes from '../routes/charges.routes';

config({
  path: './.env',
});

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
    this.app.use(
      cors({ origin: process.env.VITE_URL_FRONT, credentials: true })
    );
    this.app.use(express.json());
    this.app.use(authRouter);
    this.app.use(usersRouter);
    this.app.use(employeeRouter);
    this.app.use(personsRouter);
    this.app.use(communesRouter);
    this.app.use(chargesRoutes);
    this.app.use(lettersRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor ejecutandose en: ${process.env.VITE_URL_FRONT}`);
    });
  }
}

export default Server;

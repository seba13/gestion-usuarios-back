import { Application } from 'express';
export declare class Server {
  port: string | number;
  app: Application;
  constructor();
  middlewares(): void;
  listen(): void;
}
export default Server;

import { Router, Request, Response } from 'express';

const personaRouter = Router();

personaRouter.get('/ping', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'pong',
  });
});

export default personaRouter;

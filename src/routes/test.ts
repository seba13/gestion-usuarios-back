import { Router, Request, Response } from 'express';

export const test = Router();

test.get('/test/ping', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'pong',
  });
});

export default test;

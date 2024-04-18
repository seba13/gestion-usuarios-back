import { AuthService } from '../services/';
import { Request, Response } from 'express';
import { HttpStatus } from '../models';
// // import { AuthMiddleware } from '../middlewares/auth.middleware';
// import jwt from 'jsonwebtoken';
export class AuthController {
  public async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const existsUser = await new AuthService().verifyUserAndPassword(
        res,
        req.body
      );
      return res.status(existsUser.code).json(existsUser);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al autenticar');
    }
  }
  public async test(req: Request, res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).json('ok');
  }
}

import { AuthService } from '../services/';
import { Request, Response } from 'express';
import { IpUtils } from '../utils';
import { HttpStatus } from '../models';
// // import { AuthMiddleware } from '../middlewares/auth.middleware';
// import jwt from 'jsonwebtoken';
export class AuthController {
  public async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { usuario, contrasena } = req.body;
      const userCredentials = { usuario, contrasena, ip: IpUtils.getIp(req) };
      const existsUser = await new AuthService().verifyUserAndPassword(
        userCredentials
      );
      // console.log(existsUser.body.token);
      res.set('Authorization', `Bearer ${existsUser.message.token}`);
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

import { LoginService } from '../services/login.service';
import { Request, Response } from 'express';
import { IpUtils } from '../utils/';
import { HttpStatus } from '../models';
// // import { AuthMiddleware } from '../middlewares/auth.middleware';
// import jwt from 'jsonwebtoken';
export class LoginController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { usuario, contrasena } = req.body;
      const user = { usuario, contrasena, ip: IpUtils.getIp(req) };
      // const token = AuthMiddleware.generateToken(user);
      const existsUser = await new LoginService().verifyUserAndPassword(user);
      return res.status(existsUser.code).json(existsUser.body);
    } catch (error) {
      console.error('Error al validar credenciales.', error);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Error al validar usuario y contraseña',
      });
    }
  }
}

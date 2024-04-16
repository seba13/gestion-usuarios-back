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
      // res.set('Authorization', `Bearer ${existsUser.message.token}`);
      res.cookie('token', existsUser.message.token, {
        maxAge: 900000, // Tiempo de vida de la cookie en milisegundos (aquí, 15 minutos)
        httpOnly: true, // La cookie solo es accesible en el servidor
        secure: false, // La cookie solo se envía a través de conexiones HTTPS
      });
      console.log('COOKIE CREADA.');
      // Enviar una respuesta al cliente
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

import { HttpStatus, TToken } from '../models';
import { AuthService } from '../services/';
import { Request, Response } from 'express';
export class AuthController {
  public static async restorePassword(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const restorePassword = await new AuthService().findEmailToRecover(req);
      // const emailResponse: boolean = ServerResponse.sendEmail();
      return res.status(restorePassword.code).json(restorePassword);
    } catch (error) {
      console.error('ERROR: ', error);
      return res
        .status(HttpStatus.ERROR)
        .json('Error al recuperar contraseña.');
    }
  }
  public static async authenticate(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const existsUser = await new AuthService().authenticate(res, req);
      return res.status(existsUser.code).json(existsUser);
    } catch (error) {
      console.error('ERROR: ', error);
      return res.status(HttpStatus.ERROR).json('Error al autenticar.');
    }
  }
  public async closeSession(req: Request, res: Response): Promise<Response> {
    try {
      const sessionResponse = await new AuthService().closeSession(req);
      return res.status(sessionResponse.code).json(sessionResponse);
    } catch (error) {
      console.error('ERROR: ', error);
      return res.status(HttpStatus.ERROR).json('Error al cerrar sesion.');
    }
  }
  public async verifyIncomingToken(req: any, res: any) {
    const token: TToken = req.cookies['cookie-token'];

    console.log('Incoming #Token: ', token);
    const myService = await new AuthService().verifyToken(token);
    return res.status(HttpStatus.OK).json(myService);
  }
  public async verifyCookieToken(req: any, res: any) {
    const token: TToken = req.cookies['cookie-token'];
    console.log('TOKEN RECIBIDO: ', token);
    const isValid = await new AuthService().verifyCookieToken(token);
    return res.status(HttpStatus.OK).json(isValid);
  }
}

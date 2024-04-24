import { HttpStatus, IToken } from '../models';
import { AuthService } from '../services/';
import { Request, Response } from 'express';
export class AuthController {
  public static async authenticate(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const existsUser = await new AuthService().authenticate(res, req);
      return res.status(existsUser.code).json(existsUser);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al autenticar');
    }
  }
  public async closeSession(req: Request, res: Response): Promise<Response> {
    try {
      const sessionResponse = await new AuthService().closeSession(req);
      return res.status(sessionResponse.code).json(sessionResponse);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al cerrar sesion');
    }
  }
  public async verifyIncomingToken(req: any, res: any) {
    const unknowToken: IToken = req.query;
    console.log('Incoming #Token: ', unknowToken.token);
    const myService = await new AuthService().verifyToken(unknowToken);
    return res.status(HttpStatus.OK).json(myService);
  }
}

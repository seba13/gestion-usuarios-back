import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../models';
import { ServerResponse } from '../utils';

export class AuthMiddleware {
  private static secretKey: string = '12345';

  public verifyToken(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    const token = req.cookies['cookie-token'];
    if (!token) {
      res.cookie('cookie-token', '');

      return res
        .status(ServerResponse.Unauthorized().code)
        .json(ServerResponse.Unauthorized('Token no encontrado.'));
    }

    try {
      const decoded = jwt.verify(token, AuthMiddleware.secretKey); //llevar a variable de entorno .env
      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(ServerResponse.Unauthorized('Token invalido.'));
    }
  }
}

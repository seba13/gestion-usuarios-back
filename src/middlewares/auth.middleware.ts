import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
  private static secretKey = '12345';

  public static generateToken(payload: any): string {
    const token = jwt.sign(payload, AuthMiddleware.secretKey);
    console.log('TOKEN GENERADO: ', token);
    return token;
  }

  public static verifyToken(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    try {
      const decoded = jwt.verify(token, AuthMiddleware.secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

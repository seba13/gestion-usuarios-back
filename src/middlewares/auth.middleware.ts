// auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token de autenticación no proporcionado' });
  }

  jwt.verify(token, 'secreto', (err: any, user: any) => {
    if (err) {
      return res
        .status(403)
        .json({ message: 'Token de autenticación inválido' });
    }
    req.user = user;
    next();
  });
};

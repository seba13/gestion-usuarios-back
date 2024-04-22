import { HttpStatus, IResponse } from '../models';
import jwt from 'jsonwebtoken';
export class ServerResponse {
  public static generateCookie(res: any, data: any) {
    res.cookie('cookie-token', data, {
      maxAge: 900000, // Tiempo de vida de la cookie en milisegundos (aquí, 15 minutos)
      // httpOnly: true, // La cookie solo es accesible en el servidor
      secure: false, // La cookie solo se envía a través de conexiones HTTPS
    });
    console.log('COOKIE CREADA.');
  }
  public static generateToken(
    payload: any,
    secretKey: string = '12345'
  ): string {
    const token = jwt.sign(payload, secretKey);
    // res.set('Authorization', `Bearer ${existsUser.message.token}`);
    return token;
  }

  public static Ok(data?: any): IResponse {
    return {
      code: HttpStatus.OK,
      status: 'Success',
      message: data,
    };
  }
  public static Error(data?: any): IResponse {
    return {
      code: HttpStatus.ERROR,
      status: 'Error',
      message: data,
    };
  }
  public static ErrorInternalServer(data?: any): IResponse {
    return {
      code: HttpStatus.ERROR_INTERNAL,
      status: 'Internal server error',
      message: data,
    };
  }
  public static Forbidden(data?: any): IResponse {
    return {
      code: HttpStatus.FORBIDDEN,
      status: 'Forbidden',
      message: data,
    };
  }
  public static NotFound(data?: any): IResponse {
    return {
      code: HttpStatus.NOT_FOUND,
      status: 'Not found',
      message: data,
    };
  }
  public static Unauthorized(data?: any): IResponse {
    return {
      code: HttpStatus.UNAUTHORIZED,
      status: 'Unauthorized',
      message: data,
    };
  }
  public static Created(data?: any): IResponse {
    return {
      code: HttpStatus.CREATED,
      status: 'Created',
      message: data,
    };
  }
  public static NoContent(data?: any): IResponse {
    return {
      code: HttpStatus.NO_CONTENT,
      status: 'No content',
      message: data,
    };
  }
}

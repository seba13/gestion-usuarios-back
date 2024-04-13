import { HttpStatus, IResponse } from '../models';
import jwt from 'jsonwebtoken';
export class ServerResponse {
  public static generateToken(
    payload: any,
    secretKey: string = '12345'
  ): string {
    const token = jwt.sign(payload, secretKey);
    return token;
  }

  public static Ok(data?: any): IResponse {
    return {
      code: HttpStatus.OK,
      status: 'Success',
      body: data,
    };
  }
  public static Error(data?: any): IResponse {
    return {
      code: HttpStatus.ERROR,
      status: 'Error',
      body: data,
    };
  }
  public static ErrorInternalServer(data?: any): IResponse {
    return {
      code: HttpStatus.ERROR_INTERNAL,
      status: 'Internal server error',
      body: data,
    };
  }
  public static Forbidden(data?: any): IResponse {
    return {
      code: HttpStatus.FORBIDDEN,
      status: 'Forbidden',
      body: data,
    };
  }
  public static NotFound(data?: any): IResponse {
    return {
      code: HttpStatus.NOT_FOUND,
      status: 'Not found',
      body: data,
    };
  }
  public static Unauthorized(data?: any): IResponse {
    return {
      code: HttpStatus.UNAUTHORIZED,
      status: 'Unauthorized',
      body: data,
    };
  }
  public static Created(data?: any): IResponse {
    return {
      code: HttpStatus.CREATED,
      status: 'Created',
      body: data,
    };
  }
  public static NoContent(data?: any): IResponse {
    return {
      code: HttpStatus.NO_CONTENT,
      status: 'No content',
      body: data,
    };
  }
}

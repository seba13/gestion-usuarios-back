import {
  HttpStatus,
  IPayloadType,
  IResponse,
  IToken,
  TSecretKey,
  TToken,
  UserEmail,
} from '../models';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
export class ServerResponse {
  public static async verifyTokenSign(token: TToken): Promise<boolean> {
    // Verificar el token
    jwt.verify(
      token,
      process.env.JWT_KEY as TSecretKey,
      (err: any, decoded: any) => {
        if (err) {
          // El token no es válido
          console.error('Error al verificar el token:', err.message);
          return false;
        }
        console.log('Token válido:', decoded);
      }
    );
    // El token es válido
    return true;
  }
  public static async sendEmail(token: IToken | any, toEmail: UserEmail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // send mail with defined transport object
    const emailBody = {
      from: `"Sistema GP 👻" <${process.env.EMAIL_USER}>`, // sender address
      to: `${toEmail}`, // list of receivers
      subject: 'Link de acceso ✔', // Subject line
      text: 'aca esta tu link para poder acceder al portal.', // plain text body
      html: `<b>http://localhost:5173/accesLink?token=${token}</b>`, // html body
    };
    const info = await transporter.sendMail(emailBody);
    if (!info.accepted) {
      return false;
    }
    console.log('EMAIL ENVIADO.');
    return true;
  }
  public static generateCookie(res: any, data: any) {
    res.cookie('cookie-token', data, {
      maxAge: 300000, // Tiempo de vida de la cookie en milisegundos (aquí, 15 minutos)
      // httpOnly: true, // La cookie solo es accesible en el servidor
      secure: false, // La cookie solo se envía a través de conexiones HTTPS
    });
    console.log('COOKIE CREADA.');
  }
  public static generateToken(payload: IPayloadType): IToken {
    try {
      const token = jwt.sign(payload, process.env.JWT_KEY as TSecretKey, {
        expiresIn: '3m',
      });
      console.log('TOKEN: ', token);
      return token as any as IToken;
    } catch (error) {
      console.error('Error al generar el token:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
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

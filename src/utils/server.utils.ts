import {
  HttpStatus,
  IPayloadType,
  IResponse,
  TSecretKey,
  TToken,
} from '../models';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export class ServerResponse {
  public static async verifyTokenSign(token: TToken): Promise<any> {
    // Verificar el token
    const response = jwt.verify(
      token,
      process.env.JWT_KEY as TSecretKey,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: any, decoded: any) => {
        if (err) {
          // El token no es válido
          return HttpStatus.ERROR;
        }
        return HttpStatus.OK;
      }
    );
    return response;
  }
  public static async sendEmail(email: any, toEmail: string) {
    if (!email || !toEmail) {
      console.log('No se pudo enviar el correo');
    }
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const emailBody = {
      from: `"Sistema GP👻" <${process.env.EMAIL_USER}>`, // sender address
      to: `${toEmail}`, // list of receivers
      subject: email.subject, // Subject line
      text: `${email.text}`, // plain text body
      html: `<b>${email.body}</b>`, // html body
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
      maxAge: 1200000, // Tiempo de vida de la cookie en milisegundos (aquí, 15 minutos)
      httpOnly: false, // La cookie solo es accesible en el servidor
      sameSite: 'strict',
      secure: false,
    });
    console.log('COOKIE CREADA.');
  }
  public static generateToken(payload: IPayloadType): string {
    try {
      const token = jwt.sign(payload, process.env.JWT_KEY as TSecretKey, {
        expiresIn: '20m',
      });
      console.log('TOKEN: ', token);
      return token as string;
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

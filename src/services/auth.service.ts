import { UserRepository } from '../repository/user.repository';
import { IpUtils, Password, ServerResponse, UsersUtils } from '../utils';
import {
  HttpStatus,
  IEmail,
  IResponse,
  IUser,
  TToken,
  IPayloadType,
} from '../models';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
export class AuthService {
  private repository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.repository = repository;
  }

  public async findEmailToRecover(req: Request): Promise<IResponse> {
    const { correo } = req.body;
    //validar si existe el email del usuario
    const userEmail: IEmail[] = await this.repository.getUserEmail(correo);
    // console.log(userEmail[0].correo);
    // console.log(userEmail[0].idPersona);
    if (!userEmail[0] || !userEmail[0].correo) {
      return ServerResponse.Error('Correo no existe.');
    }
    // generar nueva contraseña aqui
    const newTemporalPass = await UsersUtils.generateNewPassword();
    // actualizar en bd
    const responseUpdate = await this.repository.updateById(
      userEmail[0].idEmpleado,
      newTemporalPass.encrypted
    );
    // console.log(userEmail[0].idEmpleado);
    if (responseUpdate.affectedRows === 0) {
      return ServerResponse.Error('Error al actualizar contraseña..');
    }
    console.log('NEW TEMP PASS: ', newTemporalPass);
    //generar email
    const emailBody = {
      subject: 'Recuperacion de contraseña - Sistema GP.',
      text: 'Te adjuntamos la nueva contraseña generada para que ingreses al sistema.',
      body: `Nueva contraseña generada por el sistema: ${newTemporalPass.password} `,
    };
    const emailResponse = await ServerResponse.sendEmail(
      emailBody,
      userEmail[0].correo
    );
    //validar email
    if (!emailResponse) {
      return ServerResponse.Error('Error al enviar el correo');
    }
    //enviar respuesta
    return ServerResponse.Ok('Email envido.✅');
  }

  public async verifyCapCode(req: Request): Promise<IResponse> {
    const { codigo } = req.body;
    const token: TToken = req.cookies['cookie-token'];
    const isValid = await this.repository.getCodeCap(codigo, token);
    const isDisabled = await this.repository.disableToken(token);
    if (isDisabled.affectedRows === 0) {
      return ServerResponse.Error('ERror aca');
    }
    if (isValid[0].existe === 0) {
      console.log(isValid);
      return ServerResponse.Unauthorized('Codigo cap invalido.');
    }
    return ServerResponse.Ok('Codigo cap valido.');
  }
  public async verifyCookieToken(token: TToken): Promise<IResponse> {
    const verifyTokenSign: HttpStatus =
      await ServerResponse.verifyTokenSign(token);
    return verifyTokenSign === 200
      ? ServerResponse.Ok('Token firmado valido.')
      : ServerResponse.Error('Token firma invalida.');
  }
  /////esto se debe refactorizar??
  public async verifyToken(token: TToken): Promise<IResponse> {
    // VALIDAR LA FIRMA
    const verifyTokenSign = await ServerResponse.verifyTokenSign(token);
    if (!verifyTokenSign) {
      return ServerResponse.Unauthorized('Token invalido.');
    }
    //VALIDAR SI EXISTE TOKEN
    const existsToken: any = await this.repository.verifyToken(token);
    if (existsToken[0].count === 0) {
      return ServerResponse.Unauthorized('Token invalido o expirado.');
    }
    //SI SON IGUALES, BAJARLO DE LA BASE DE DATOS
    const responseDisableToken = await this.repository.disableToken(token);
    if (responseDisableToken.affectedRows === 0) {
      return ServerResponse.ErrorInternalServer();
    }
    console.log('TOKEN MARCADO UTILIZADO.');
    //RETORNAR RESPUESTA
    return ServerResponse.Ok('Token recibido valido');
  }

  public async closeSession(req: any): Promise<IResponse> {
    const { rut } = req.params;
    const closeSession = await this.repository.closeSession(rut);
    if (closeSession.affectedRows === 0 || !closeSession) {
      return ServerResponse.Error('Error al finalizar sesion.');
    }
    return ServerResponse.Ok('Sesion finalizada.');
  }

  public async authenticate(res: any, req: any): Promise<IResponse> {
    //REFACTORIZAR TODO ESTO
    //AGREGAR CODIGO CAP DE 4 DIGITOS DE VERIFICACION
    try {
      const { usuario, contrasena } = req.body; //Destructurar
      const userData: IUser[] = await this.repository.getByUsername(usuario); //Buscar usuario
      //Guardar log de intento de sesion
      this.repository.saveLogLogin({
        newId: uuid(),
        timestamp: new Date(),
        username: usuario,
        ip: IpUtils.getIp(req),
      });
      if (!userData[0] || !userData[0].usuario) {
        return ServerResponse.Unauthorized('usuario y contraseña invalidos');
      }
      const isPasswordValid = await Password.comparePasswords(
        contrasena,
        userData[0].contrasena
      );
      if (!isPasswordValid) {
        return ServerResponse.Unauthorized('Autenticacion incorrecta');
      }
      /////////////////////////
      if (userData[0].activo === 1) {
        console.log('CERRANDO SESION ACTIVA');
        const responseDisable = await this.repository.disableUserStatus(
          userData[0].idUsuario
        );
        if (responseDisable.affectedRows === 0) {
          return ServerResponse.Error('Error al iniciar sesion.');
        }
      }
      console.log('INICIANDO SESION');
      const responseActivate = await this.repository.activateUserStatus(
        userData[0].idUsuario
      );
      if (responseActivate.affectedRows === 0) {
        return ServerResponse.Error('Error al iniciar sesion.');
      }
      const { idUsuario, correo } = userData[0];
      const payload: IPayloadType = {
        idUsuario: idUsuario,
        usuario: usuario,
      };
      const token: TToken = ServerResponse.generateToken(payload);
      // console.log('INTERFAZ TOKEN:', token);
      if (!token && typeof token !== 'string') {
        return ServerResponse.Error();
      }
      //falta guardar la token en la bd
      const capCode = await UsersUtils.generateCapCode();
      const tokenInfo = {
        idToken: uuid(),
        idUsuario: idUsuario,
        token: token,
        codigoCap: capCode,
        fechaCreacion: new Date().toDateString(),
      };
      const sessionInfo = {
        newId: uuid(),
        userId: idUsuario,
        timestamp: new Date(),
        ip: IpUtils.getIp(req),
        idToken: tokenInfo.idToken,
      };
      const saveTokenResponse = await this.repository.saveToken(tokenInfo);

      if (saveTokenResponse.affectedRows === 0 || !saveTokenResponse) {
        return ServerResponse.Error();
      }
      const saveSessionResponse =
        await this.repository.saveSession(sessionInfo);
      if (saveSessionResponse.affectedRows === 0 || !saveSessionResponse) {
        ServerResponse.Error();
      }

      //'el token se debe generar post login, una vez confirmado el codigo cap, se debe enviar el token'
      ServerResponse.generateCookie(res, token);
      //aca enviar el email
      const body = {
        subject: 'Codigo de autorizacion 🔐',
        text: 'Te enviamos tu codigo de 4 digitos...',
        body: `Tu codigo secreto de 4 digitos es:   ${capCode}`,
      };
      console.log(body);
      const sendEmail = await ServerResponse.sendEmail(body, correo);
      if (!sendEmail) {
        return ServerResponse.ErrorInternalServer(
          'No se pudo enviar el codigo de autorizacion.'
        );
      }
      return ServerResponse.Ok('Codigo cap enviado');
    } catch (error) {
      console.log('entra acá');

      console.error('Error al comprobar usuario y contraseña:', error);
      return ServerResponse.Error('Error al iniciar sesion');
    }
  }
}

import { UserRepository } from '../repository/user.repository';
import { IpUtils, Password, ServerResponse } from '../utils';
import { IResponse, IUser } from '../models';
import { v4 as uuid } from 'uuid';
export class AuthService {
  private repository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.repository = repository;
  }
  public async closeSession(req: any): Promise<IResponse> {
    const { userId } = req.params;
    const closeSession = await this.repository.closeSession(userId);
    if (closeSession.affectedRows === 0 || !closeSession) {
      return ServerResponse.Error('Error al finalizar sesion.');
    }
    return ServerResponse.Ok('Sesion finalizada.');
  }

  public async authenticate(res: any, req: any): Promise<IResponse> {
    //REFACTORIZAR TODO ESTO
    try {
      const { usuario, contrasena } = req.body;
      const userData: IUser[] = await this.repository.getById(usuario);
      //rescatar el log de intento de sesion
      const clientIp = IpUtils.getIp(req);
      this.repository.saveLogLogin({
        newId: uuid(),
        timestamp: new Date(),
        username: usuario,
        ip: clientIp,
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
      // if (userData[0].activo === 1) {
      //   return ServerResponse.Error('Sesion activa');
      // }

      console.log('NO HAY SESION ACTIVA');
      const response = await this.repository.activateUserStatus(
        userData[0].idUsuario
      );
      if (response.affectedRows === 0) {
        return ServerResponse.Error('Error al iniciar sesion1.');
      }
      const { idUsuario } = userData[0];
      const token = ServerResponse.generateToken(idUsuario);
      if (!token.length && typeof token === 'string') {
        return ServerResponse.Error();
      }
      //falta guardar la token en la bd
      const tokenInfo = {
        newId: uuid(),
        token: token,
        userId: idUsuario,
      };
      const sessionInfo = {
        newId: uuid(),
        userId: idUsuario,
        timestamp: new Date(),
        ip: clientIp,
        idToken: tokenInfo.newId,
      };
      const saveTokenResponse = await this.repository.saveToken(tokenInfo); // aca va

      if (saveTokenResponse.affectedRows === 0 || !saveTokenResponse) {
        return ServerResponse.Error();
      }
      const saveSessionResponse =
        await this.repository.saveSession(sessionInfo);
      if (saveSessionResponse.affectedRows === 0 || !saveSessionResponse) {
        ServerResponse.Error();
      }
      console.log('TOKEN GENERADO');
      ServerResponse.generateCookie(res, token);
      //aca enviar el email
      if (!(await ServerResponse.sendEmail(token))) {
        return ServerResponse.ErrorInternalServer(
          'No se pudo enviar el codigo de verificacion.'
        );
      }
      return ServerResponse.Ok('Autenticacion correcta');
    } catch (error) {
      console.log('entra acá');

      console.error('Error al comprobar usuario y contraseña:', error);
      return ServerResponse.Error('Error al iniciar sesion');
    }
  }
}

import { UserRepository } from '../repository/user.repository';
import { IpUtils, Password, ServerResponse } from '../utils';
import { IPayloadType, IResponse, IToken, ITokenInfo, IUser } from '../models';
import { v4 as uuid } from 'uuid';
export class AuthService {
  private repository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.repository = repository;
  }
  public async verifyToken(token: IToken): Promise<IResponse> {
    const verifyToken: any = await this.repository.verifyToken(token);
    if (verifyToken[0].count === 0 || verifyToken[0].count < 1) {
      return ServerResponse.NotFound('Token no encontrado');
    }
    return ServerResponse.Ok('Token valido');
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
      const userData: IUser[] = await this.repository.getByUsername(usuario);
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
      const { idUsuario } = userData[0];
      const payload: IPayloadType = {
        userId: idUsuario,
        createdAt: new Date().toDateString(),
      };
      const token: IToken = ServerResponse.generateToken(payload);
      // console.log('INTERFAZ TOKEN:', token);
      if (!token && typeof token !== 'string') {
        return ServerResponse.Error();
      }
      //falta guardar la token en la bd
      const tokenInfo: ITokenInfo = {
        id: uuid(),
        token: token,
        userId: idUsuario,
        createdAt: new Date().toDateString(),
      };
      const sessionInfo = {
        newId: uuid(),
        userId: idUsuario,
        timestamp: new Date(),
        ip: clientIp,
        idToken: tokenInfo.id,
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

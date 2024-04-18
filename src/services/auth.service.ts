import { UserRepository } from '../repository/user.repository';
import { Password, ServerResponse } from '../utils';
import { IResponse, IUser } from '../models';

export class AuthService {
  private repository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.repository = repository;
  }

  public async verifyUserAndPassword(res: any, body: any): Promise<IResponse> {
    try {
      const { usuario, contrasena } = body;
      const userData: IUser[] = await this.repository.getById(usuario);
      if (!userData[0] || !userData[0].usuario) {
        return ServerResponse.Unauthorized('usuario y contraseña invalidos');
      }

      const isPasswordValid = await Password.comparePasswords(
        contrasena,
        userData[0].contrasena
      );

      if (isPasswordValid) {
        const { idUsuario } = userData[0]; //payload
        const token = ServerResponse.generateToken(idUsuario);
        if (!token.length && typeof token === 'string') {
          return ServerResponse.Error('Error al generar token');
        } else {
          ServerResponse.generateCookie(res, token);
        }
        return ServerResponse.Ok('Autenticacion correcta');
      }
      return ServerResponse.Ok('Autenticacion incorrecta');
    } catch (error) {
      console.error('Error al comprobar usuario y contraseña:', error);
      return ServerResponse.Error('Error al comprobar datos');
    }
  }
}

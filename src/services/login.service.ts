import { UserRepository } from '../repository/user.repository';
import { Password, ServerResponse } from '../utils/';
import { ILoginUser, IResponse } from '../models';

export class LoginService {
  private repository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.repository = repository;
  }

  public async verifyUserAndPassword(user: ILoginUser): Promise<IResponse> {
    console.log(user.ip);
    try {
      const userData = await this.repository.getById(user.usuario);

      if (!userData[0] || !userData[0].usuario) {
        return ServerResponse.Unauthorized(
          'Acceso denegado, credenciales invalidas.'
        );
      }

      const isPasswordValid = await Password.comparePasswords(
        user.contrasena,
        userData[0].contrasena
      );

      if (isPasswordValid) {
        return ServerResponse.Ok('Acceso concedido');
      } else {
        return ServerResponse.Unauthorized('Acceso denegado.');
      }
    } catch (error) {
      console.error('Error al comprobar usuario y contraseña:', error);
      return ServerResponse.Error('Error al comprobar usuario y contraseña');
    }
  }
}

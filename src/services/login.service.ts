import { UserRepository } from '../repository/user.repository';
import { Password } from '../utils/';
import { IServerResponse } from '../models/serverResponse';
import { ILoginUser } from '../models';
import { UsersUtils } from '../utils/';

export class LoginService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  public async verifyUserAndPassword(
    user: ILoginUser
  ): Promise<IServerResponse> {
    console.log(user.ip);
    try {
      const userData = await this.repository.getById(user.usuario);

      if (!userData[0] || !userData[0].usuario) {
        return UsersUtils.createResponse(
          401,
          'unauthorized',
          'Acceso denegado, credenciales invalidas.'
        );
      }

      const isPasswordValid = await Password.comparePasswords(
        user.contrasena,
        userData[0].contrasena
      );

      if (isPasswordValid) {
        return UsersUtils.createResponse(200, 'Authorized', 'Acceso concedido');
      } else {
        return UsersUtils.createResponse(
          401,
          'unauthorized',
          'Acceso denegado.'
        );
      }
    } catch (error) {
      console.error('Error al verificar usuario y contraseña:', error);
      throw error;
    }
  }
}

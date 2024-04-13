import { UserRepository } from '../repository/user.repository';
import { Password, ServerResponse } from '../utils';
import { ILoginUser, IResponse, IUser } from '../models';

export class AuthService {
  private repository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.repository = repository;
  }

  public async verifyUserAndPassword(user: ILoginUser): Promise<IResponse> {
    try {
      const userData: IUser[] = await this.repository.getById(user.usuario);

      if (!userData[0] || !userData[0].usuario) {
        return ServerResponse.Unauthorized('usuario y contraseña invalidos');
      }

      const isPasswordValid = await Password.comparePasswords(
        user.contrasena,
        userData[0].contrasena
      );

      if (isPasswordValid) {
        const token = ServerResponse.generateToken(user); //ver donde meter el token y cambiar el payload
        // Si se genera correctamente, enviar el token en la cabecera de la respuesta
        return ServerResponse.Ok({ token });
      } else {
        return ServerResponse.Unauthorized('usuario y contraseña invalidos');
      }
    } catch (error) {
      console.error('Error al comprobar usuario y contraseña:', error);
      return ServerResponse.Error('Error al comprobar datos');
    }
  }
}

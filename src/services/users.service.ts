import { UserRepository } from '../repository/user.repository';
import { IUser, ILoginUser, IServerResponse } from '../models';
import { UsersUtils } from '../utils/';

export class UsersService {
  public repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  public async getAll(): Promise<IServerResponse> {
    try {
      const users = await this.repository.getAll();
      if (!users.length) {
        return UsersUtils.createResponse(
          404,
          'not found',
          'Usuarios no encontrados'
        );
      }
      return UsersUtils.createResponse(200, 'success', users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  public async getById(username: string): Promise<IServerResponse> {
    try {
      const user = await this.repository.getById(username);

      if (!user.length) {
        return UsersUtils.createResponse(
          404,
          'not found',
          'Usuario no encontrado'
        );
      }
      return UsersUtils.createResponse(200, 'success', user);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

  public async save(user: IUser): Promise<IServerResponse> {
    const resultSave = await this.repository.save(user);
    return UsersUtils.createResponse(200, 'success', resultSave);
  }

  public async update(user: ILoginUser): Promise<IServerResponse> {
    const resultUpdate = await this.repository.update(user);

    const code = resultUpdate.affectedRows == 0 ? 204 : 200;
    const message =
      resultUpdate.affectedRows == 0
        ? 'No se realizaron cambios.'
        : 'Cambios realizados.';
    const status = resultUpdate.affectedRows == 0 ? 'denied' : 'success';

    return UsersUtils.createResponse(code, status, message);
  }
}

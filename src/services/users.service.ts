import { UserRepository } from '../repository/user.repository';
import { IUser, IResponse } from '../models';
import { ServerResponse } from '../utils/';
import { ResultSetHeader } from 'mysql2';

export class UsersService {
  private repository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.repository = repository;
  }

  public async getAll(): Promise<IResponse> {
    const users: IUser[] = await this.repository.getAll();
    if (!users.length) {
      return ServerResponse.NotFound('No se encuentran datos.');
    } else {
      return ServerResponse.Ok(users);
    }
  }

  public async getById(username: string): Promise<IResponse> {
    try {
      const user: IUser[] = await this.repository.getById(username);

      if (!user.length) {
        return ServerResponse.NotFound('datos no encontrados');
      }
      return ServerResponse.Ok(user);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return ServerResponse.ErrorInternalServer('Error al buscar datos');
    }
  }

  public async save(user: IUser): Promise<IResponse> {
    const resultSave: ResultSetHeader = await this.repository.save(user);
    return ServerResponse.Ok(resultSave);
  }

  public async update(idUser: string, newPassword: string): Promise<IResponse> {
    const resultUpdate: ResultSetHeader = await this.repository.update(
      idUser,
      newPassword
    );
    if (resultUpdate.affectedRows === 0) {
      return ServerResponse.Error('Error al actualizar datos');
    }
    return ServerResponse.Ok('Cambios realizados');
  }
}

import { UserRepository } from '../repository/user.repository';
import { IUser, ILoginUser, IResponse } from '../models';
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
      return ServerResponse.NotFound();
    } else {
      return ServerResponse.Ok(users);
    }
  }

  public async getById(username: string): Promise<IResponse> {
    try {
      const user: IUser[] = await this.repository.getById(username);

      if (!user.length) {
        return ServerResponse.NotFound('Usuario no encontrado');
      }
      return ServerResponse.Ok(user);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return ServerResponse.ErrorInternalServer('Error al buscar usuario');
    }
  }

  public async save(user: IUser): Promise<IResponse> {
    const resultSave: ResultSetHeader = await this.repository.save(user);
    return ServerResponse.Ok(resultSave);
  }

  public async update(user: ILoginUser): Promise<IResponse> {
    const resultUpdate: ResultSetHeader = await this.repository.update(user);
    if (resultUpdate.affectedRows === 0) {
      return ServerResponse.Error('Error al actualizar datos');
    }
    return ServerResponse.Ok('Cambios realizados');
  }
}

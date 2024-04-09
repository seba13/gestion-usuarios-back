import { ResultSetHeader } from 'mysql2';
import pool from '../config/db';
import { IUser, ILoginUser } from '../models';

export class UserRepository {
  private promise;
  constructor() {
    this.promise = pool.promise();
  }
  // seguir ste ej
  // public async test1(): Promise<IUser[]> {
  //   const [row] = await this.promise.query('SELECT * FROM usuarios');

  //   return row as IUser[];
  // }

  public async getAll(): Promise<IUser[]> {
    const [row] = await this.promise.query('SELECT * FROM usuarios'); //field is optional
    return row as IUser[];
  }
  public async getById(username: string): Promise<IUser[]> {
    const [row] = await this.promise.query(
      'SELECT * FROM usuarios where usuario = ?',
      [username]
    ); //field is optional
    return row as IUser[];
  }

  public async save(user: IUser): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'INSERT INTO usuarios (id_usuario, usuario, contrasena, activo) VALUES (?, ?, ?, ?)',
      [user.idUsuario, user.usuario, user.contrasena, user.activo]
    ); //field is optional
    // console.log(row);
    return row as ResultSetHeader;
  }
  public async update(user: ILoginUser): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'UPDATE usuarios SET contrasena=? WHERE usuario=?',
      [user.contrasena, user.usuario]
    ); //field is optional
    return row as ResultSetHeader;
  }
}

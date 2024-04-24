import { ResultSetHeader } from 'mysql2';
import pool from '../config/db';
import { IToken, ITokenInfo, IUser } from '../models';

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
  public async getByUsername(username: string): Promise<IUser[]> {
    const [row] = await this.promise.query(
      'SELECT id_usuario as idUsuario, usuario, contrasena, activo, rol ,fec_creacion as fecCreacion, ultimo_acceso as ultimoAcceso FROM usuarios where usuario = ?',
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
  public async update(
    username: string,
    newPassword: string
  ): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'UPDATE usuarios SET contrasena=? WHERE usuario=?',
      [newPassword, username]
    ); //field is optional
    return row as ResultSetHeader;
  }
  public async activateUserStatus(userId: string): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'UPDATE usuarios SET activo=1 WHERE id_usuario=?',
      [userId]
    ); //field is optional

    return row as ResultSetHeader;
  }
  public async disableUserStatus(userId: string): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'UPDATE usuarios SET activo=0 WHERE id_usuario=?',
      [userId]
    ); //field is optional
    return row as ResultSetHeader;
  }
  public async saveToken(token: ITokenInfo): Promise<ResultSetHeader> {
    const [row] = await this.promise.query('call crearToken(?,?,?);', [
      token.id,
      token.token,
      token.userId,
    ]); //field is optional
    return row as ResultSetHeader;
  }
  public async saveSession(data: any): Promise<ResultSetHeader> {
    const [row] = await this.promise.query('call crearSesion(?,?,?);', [
      data.newId,
      data.userId,
      data.ip,
    ]); //field is optional
    return row as ResultSetHeader;
  }
  public async closeSession(userId: string): Promise<ResultSetHeader> {
    const [row] = await this.promise.query('call cerrarSesion(?);', [userId]); //field is optional
    return row as ResultSetHeader;
  }
  public async saveLogLogin(data: any): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'INSERT INTO usuarios_acceso_log VALUES(?,?,?,?);',
      [data.newId, data.ip, data.username, data.timestamp]
    ); //field is optional
    return row as ResultSetHeader;
  }

  public async verifyToken(token: IToken): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'select count(*) as count from tokens where token=? and utilizado=0',
      [token.token]
    ); //field is optional
    return row as ResultSetHeader;
  }
  public async disableToken(token: IToken): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'UPDATE tokens SET utilizado=1, expirado = 1 where token=?',
      [token.token]
    ); //field is optional
    return row as ResultSetHeader;
  }
}

import { ResultSetHeader } from 'mysql2';
import pool from '../config/db';
import { IUser, TToken, IEmail, TEmail } from '../models';

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

  public async getUserEmail(email: TEmail): Promise<IEmail[]> {
    const [row] = await this.promise.query(
      `SELECT d.correo, em.id_empleado AS idEmpleado
      FROM personas p
      JOIN personas_detalles pd ON pd.id_persona = p.id_persona
      JOIN detalles d ON d.id_detalle = pd.id_detalle
      JOIN empleados em on em.id_persona=p.id_persona
      WHERE d.correo=?;
      `,
      [email]
    ); //field is optional

    return row as IEmail[];
  }
  public async getEmail(email: TEmail): Promise<IEmail[]> {
    const [row] = await this.promise.query(
      `SELECT d.correo, em.id_empleado AS idEmpleado
      FROM personas p
      JOIN personas_detalles pd ON pd.id_persona = p.id_persona
      JOIN detalles d ON d.id_detalle = pd.id_detalle
      JOIN empleados em on em.id_persona=p.id_persona
      JOIN usuarios us on us.id_empleado=em.id_empleado
      WHERE us.usuario=?;
      `,
      [email]
    ); //field is optional

    return row as IEmail[];
  }

  public async getCodeCap(codigo: string, token: string): Promise<any> {
    const [row] = await this.promise.query(
      `SELECT count(*) as existe FROM tokens where codigoCap=?`,
      [codigo, token]
    ); //field is optional
    return row;
  }
  public async getAll(): Promise<IUser[]> {
    const [row] = await this.promise.query('SELECT * FROM usuarios'); //field is optional
    return row as IUser[];
  }
  public async getByUsername(username: string): Promise<IUser[]> {
    const [row] = await this.promise.query(
      `SELECT id_usuario as idUsuario, em.id_empleado as idEmpleado, usuario, correo, contrasena, activo, rol ,fec_creacion as fecCreacion, ultimo_acceso as ultimoAcceso 
      FROM usuarios u
      JOIN empleados em on em.id_empleado=u.id_empleado
      JOIN personas p on p.id_persona=em.id_persona
      JOIN personas_detalles pd on pd.id_persona=em.id_persona
      JOIN detalles d on d.id_detalle=pd.id_detalle
      where u.usuario = ?;`,
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
  public async updateById(
    idEmployee: string,
    newPassword: string
  ): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'UPDATE usuarios SET contrasena=? WHERE id_empleado=?',
      [newPassword, idEmployee]
    ); //field is optional
    return row as ResultSetHeader;
  }
  public async updateByUsername(
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
  public async saveToken(token: any): Promise<ResultSetHeader> {
    const [row] = await this.promise.query('call crearToken(?,?,?,?);', [
      token.idToken,
      token.token,
      token.idUsuario,
      token.codigoCap,
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
  public async closeSession(rut: string): Promise<ResultSetHeader> {
    const [row] = await this.promise.query('call cerrarSesion(?);', [rut]); //field is optional
    return row as ResultSetHeader;
  }
  public async saveLogLogin(data: any): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'INSERT INTO usuarios_acceso_log VALUES(?,?,?,?);',
      [data.newId, data.ip, data.username, data.timestamp]
    ); //field is optional
    return row as ResultSetHeader;
  }

  public async verifyToken(token: TToken): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'select count(*) as count from tokens where token=? and utilizado=0',
      [token]
    ); //field is optional
    return row as ResultSetHeader;
  }
  public async disableToken(token: TToken): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'UPDATE tokens SET utilizado = 1, expirado = 1 WHERE token = ?;',
      [token]
    ); //field is optional
    return row as ResultSetHeader;
  }
}

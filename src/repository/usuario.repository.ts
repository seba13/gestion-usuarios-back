import { RowDataPacket } from 'mysql2';
import pool from '../config/db';
import { v4 as uuidv4 } from 'uuid';

export class UsuarioRepository {
  constructor() {}

  public getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      pool.query<RowDataPacket[]>(
        'SELECT * FROM usuarios',
        (error, results) => {
          if (error) {
            reject(new Error('Error al obtener usuarios'));
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  public getById(username: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      pool.query<RowDataPacket[]>(
        'SELECT * FROM usuarios WHERE usuario=?',
        [username],
        (error, results) => {
          if (error) {
            reject(new Error('Error al obtener usuarios'));
            return;
          } else {
            resolve(results);
            return;
          }
        }
      );
    });
  }

  public save(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      pool.query<RowDataPacket[]>(
        'INSERT INTO usuarios (id_usuario, usuario, contrasena, activo) VALUES (?, ?, ?, ?)',
        [uuidv4(), user.usuario, user.contrasena, user.activo],
        (error, results) => {
          if (error) {
            reject(new Error('Error al registrar usuario en el repositorio'));
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  public update(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      pool.query<RowDataPacket[]>(
        'UPDATE usuarios SET contrasena=? WHERE usuario=?',
        [user.contrasena, user.usuario],
        (error, results) => {
          if (error) {
            reject(
              new Error(
                'Error al actualizar contraseña de usuario en el repositorio'
              )
            );
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  public find(user: string, pwd: string): Promise<any> {
    return new Promise((resolve, reject) => {
      pool.query<RowDataPacket[]>(
        'SELECT (id_usuario, usuario, contrasena) from usuarios where usuario=? and contrasena=?',
        [user, pwd],
        (error, results) => {
          if (error) {
            reject(new Error('Error al buscar usuario en el repositorio'));
          } else {
            resolve(results);
          }
        }
      );
    });
  }
}

import { UsuarioRepository } from '../repository/usuario.repository';
import bcrypt from 'bcrypt';
export class LoginService {
  public repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  public async verifyUserAndPassword(
    username: string,
    password: string
  ): Promise<any> {
    try {
      // 1- BUSCAR USUARIO
      // 2- BUSCAR CONTRASEÑA DE ESE USUARIO
      // 3- COMPARAR CONTRASEÑAS
      // 4- RETORNAR RESPUESTA

      const user = await this.repository.getById(username);
      const repositoryPassword = user[0].contrasena;

      // Comparar contraseñas dentro de una promesa
      const result = await this.decryptPassword(password, repositoryPassword);

      if (result) {
        console.log('La contraseña es válida');
        return {
          response: {
            code: 200,
            status: 'authorized',
            message: 'Acceso permitido, credenciales válidas.',
          },
        };
      } else {
        return {
          response: {
            code: 401,
            status: 'unauthorized',
            message: 'Acceso denegado, credenciales inválidas.',
          },
        };
      }
    } catch (error) {
      console.error('Error al verificar usuario y contraseña:', error);
      throw error;
    }
  }

  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  public async decryptPassword(
    actualPassword: string,
    passwordToCompare: string
  ): Promise<boolean> {
    try {
      // Comparar la contraseña proporcionada con la contraseña encriptada en la base de datos
      const result = await new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(actualPassword, passwordToCompare, (err, result) => {
          if (err) {
            console.error('Error al comparar contraseñas:', err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      if (result) {
        console.log('La contraseña es válida');
        return result;
      } else {
        console.log('La contraseña es inválida');
        return false;
      }
    } catch (error) {
      console.error('Error al comparar contraseñas:', error);
      throw new Error('Error al comparar contraseñas');
    }
  }
}

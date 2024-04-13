import { ILoginUser, IUser } from '../models';
import { v4 as uuid } from 'uuid';
import { Password } from './index';
export class UsersUtils {
  public static async generateNewUser(user: ILoginUser): Promise<IUser> {
    const newHashedPassword = await Password.hashPassword(user.contrasena);

    const newUser = {
      idUsuario: uuid(),
      usuario: user.usuario,
      contrasena: newHashedPassword,
      activo: false,
      rol: 'admin',
    };
    return newUser as IUser;
  }
  public static async updateUser(user: ILoginUser): Promise<ILoginUser> {
    const newHashedPassword = await Password.hashPassword(user.contrasena);

    const newUser: ILoginUser = {
      usuario: user.usuario,
      contrasena: newHashedPassword,
    };
    return newUser as ILoginUser;
  }
}

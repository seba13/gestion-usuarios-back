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
      activo: 0,
      rol: 'admin',
    };
    return newUser as IUser;
  }
  public static async updatePassword(newPassword: string): Promise<string> {
    const newHashedPassword = await Password.hashPassword(newPassword);
    return newHashedPassword;
  }
}

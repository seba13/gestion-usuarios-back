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

  public static async generateNewPassword() {
    // Genera un número aleatorio entre 1 y 100
    // const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    let myNumbers: any = [];
    for (let index = 0; index < 20; index++) {
      const randomNum = Math.floor(Math.random() * 100) + 1;
      myNumbers = [...myNumbers, randomNum];
    }
    console.log(myNumbers);
    let newString: any = '';
    for (let index = 0; index < myNumbers.length; index++) {
      newString += `${myNumbers[index]}`;
    }
    const cutString = newString.slice(0, 20); // Recorta desde el índice 0 hasta el índice 9
    const newPassword = await this.updatePassword(cutString);
    return { password: cutString, encrypted: newPassword };
  }
}

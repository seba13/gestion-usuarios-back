import bcrypt from 'bcrypt';

export class Password {
  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  public static async comparePasswords(
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

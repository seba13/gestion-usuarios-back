import { LoginService } from '../services/login.service';
import { Request, Response } from 'express';
import { IpUtils } from '../utils/';
// import jwt from 'jsonwebtoken';
export class LoginController {
  // public test(req: Request, res: Response) {
  //   // const { username, password } = req.body;
  //   //   // Aquí deberías autenticar al usuario, por ejemplo, consultando una base de datos
  //   //   // Simulación de autenticación para fines de demostración
  //   //   if (username === 'test' && password === '123') {
  //   //     // Si las credenciales son válidas, generamos un token JWT
  //   //     const token = jwt.sign({ username }, 'secreto', { expiresIn: '1h' });
  //   //     res.json({ token });
  //   //   } else {
  //   //     // Si las credenciales no son válidas, respondemos con un mensaje de error
  //   //     res.status(401).json({ message: 'Credenciales inválidas' });
  //   //   }
  //   // }
  //   // public protectedRoute(req: Request, res: Response) {
  //   //   res.json({
  //   //     message: 'Ruta protegida: Bienvenido ' + (req.user && req.user.username),
  //   //   });
  //   // }
  // }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { usuario, contrasena } = req.body;
      const user = { usuario, contrasena, ip: IpUtils.getIp(req) };
      const existsUser = await new LoginService().verifyUserAndPassword(user);
      return res.status(existsUser.response.code).json(existsUser.response);
    } catch (error) {
      console.error('Error al validar credenciales.', error);
      return res.status(401).json({
        status: 401,
        message: 'Error al validar credenciales de usuarios',
      });
    }
  }
}

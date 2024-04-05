// login.controller.ts
import { LoginService } from '../services/login.service';
import { Request, Response } from 'express';
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

  public async login(req: Request, res: Response) {
    try {
      const { usuario, contrasena } = req.body;
      const servicio = new LoginService();
      const respuesta = await servicio.verifyUserAndPassword(
        usuario,
        contrasena
      );
      return res.status(200).json(respuesta);
    } catch (error) {
      console.error('Error al obtener usuarios:');
      return res
        .status(500)
        .json({ status: 500, message: 'Error al obtener usuarios' });
    }
  }
}

import { Request, Response } from 'express';
import { UsuariosService } from '../services/usuarios.service';
import bcrypt from 'bcrypt';
export class UsuariosController {
  constructor() {}

  // Método de prueba (ahora es un método de instancia)
  public test(req: Request, res: Response): void {
    console.log('TEST');
    res.status(200).json({ message: 'TESTING' });
  }

  public async getAll(req: Request, res: Response) {
    try {
      const servicio = new UsuariosService();
      const datos = await servicio.getAll();
      return res.status(200).json({ status: 'success', code: 200, datos });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return res
        .status(500)
        .json({ status: 500, message: 'Error al obtener usuarios' });
    }
  }
  public async getById(req: Request, res: Response) {
    try {
      const servicio = new UsuariosService();
      const { usuario } = req.params;
      // console.log('usuario:', username);
      const datos = await servicio.getById(usuario);
      return res.status(200).json({ status: 'success', code: 200, datos });
    } catch (error) {
      console.error('Error al obtener usuario', error);
      return res
        .status(500)
        .json({ status: 'error', message: 'Error al obtener usuario' });
    }
  }
  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  public async save(req: Request, res: Response) {
    try {
      const { usuario, contrasena } = req.body;
      const newHashedPassword =
        await UsuariosController.hashPassword(contrasena);
      const nuevoUsuario = {
        usuario,
        contrasena: newHashedPassword,
        activo: false,
      };
      // console.log('NUEVO USUARIO:', nuevoUsuario);
      const servicio = new UsuariosService();
      const respuesta = await servicio.save(nuevoUsuario);
      return res
        .status(200)
        .json({ status: 'success', code: 200, message: respuesta });
    } catch (error) {
      console.error('Error al registrar el usuario:');
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Error al guardar usuario',
      });
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const { usuario, contrasena } = req.body;
      const newHashedPassword =
        await UsuariosController.hashPassword(contrasena);
      const nuevoUsuario = {
        usuario,
        contrasena: newHashedPassword,
      }; //datos del nuevo usuario aca
      console.log(nuevoUsuario);
      const servicio = new UsuariosService();
      const respuesta = await servicio.update(nuevoUsuario);
      return res
        .status(200)
        .json({ status: 'success', code: 200, message: respuesta });
    } catch (error) {
      console.error('Error al registrar el usuario');
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Error al guardar usuario',
      });
    }
  }
}

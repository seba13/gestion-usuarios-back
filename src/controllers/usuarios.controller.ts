import { Request, Response } from 'express';
import { UsuariosService } from '../services/usuarios.service';

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
      const { username } = req.params;
      // console.log('usuario:', username);
      const datos = await servicio.getById(username);
      return res.status(200).json({ status: 'success', code: 200, datos });
    } catch (error) {
      console.error('Error al obtener usuario', error);
      return res
        .status(500)
        .json({ status: 'error', message: 'Error al obtener usuario' });
    }
  }

  public async save(req: Request, res: Response) {
    try {
      const servicio = new UsuariosService();
      const usuario = {
        usuario: req.params.newUsername,
        contrasena: '1234',
        activo: false,
      }; //datos del nuevo usuario aca
      const respuesta = await servicio.save(usuario);
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

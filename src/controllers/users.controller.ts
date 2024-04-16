import { Request, Response } from 'express';
import { UsersService } from '../services';
import { UsersUtils } from '../utils/';
import { IUser, IResponse, HttpStatus } from '../models';
export class UsersController {
  constructor() {}

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const serviceResponse = await new UsersService().getAll();
      return res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return res.status(HttpStatus.ERROR).send('Error al obtener datos:');
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const response: IResponse = await new UsersService().getById(
        req.params.idUsuario
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return res.status(HttpStatus.ERROR).send('Error al buscar datos');
    }
  }

  public async save(req: Request, res: Response): Promise<Response> {
    try {
      const { usuario, contrasena } = req.body;
      const newUser: IUser = await UsersUtils.generateNewUser({
        usuario,
        contrasena,
      });
      const response: IResponse = await new UsersService().save(newUser);
      return res.status(response.code).json(response);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return res.status(HttpStatus.ERROR).send('Error al insertar datos.');
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { usuario, contrasena } = req.body;
      const newPassword = await UsersUtils.updatePassword(contrasena);
      const response: IResponse = await new UsersService().update(
        usuario,
        newPassword
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return res.status(HttpStatus.ERROR).send('Error al actualizar datos.');
    }
  }
}

import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { UsersUtils } from '../utils/users.utils';
import { IServerResponse } from '../models/serverResponse';
import { ILoginUser, IUser } from '../models';
export class UsersControllers {
  constructor() {}

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const response: IServerResponse = await new UsersService().getAll();
      return res.status(response.response.code).json(response.response);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: 'Error interno del servidor al obtener usuarios.',
      });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const response: IServerResponse = await new UsersService().getById(
        req.params.usuario
      );
      return res.status(response.response.code).json(response.response);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: 'Error interno del servidor al obtener usuario.',
      });
    }
  }

  public async save(req: Request, res: Response): Promise<Response> {
    try {
      const { usuario, contrasena } = req.body;
      const newUser: IUser = await UsersUtils.generateNewUser({
        usuario,
        contrasena,
      });
      const response: IServerResponse = await new UsersService().save(newUser);
      return res.status(response.response.code).json(response.response);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      return res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Error, usuario ya existe.',
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { usuario, contrasena } = req.body;
      const newUser: ILoginUser = await UsersUtils.updateUser({
        usuario,
        contrasena,
      });
      const response: IServerResponse = await new UsersService().update(
        newUser
      );
      return res.status(response.response.code).json(response.response);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      return res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Error al actualizar usuario.',
      });
    }
  }
}

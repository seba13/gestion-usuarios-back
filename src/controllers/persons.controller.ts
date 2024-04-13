import { Request, Response } from 'express';
import { IResponse, HttpStatus } from '../models';
import { PersonsService } from '../services';
export class PersonsController {
  constructor() {}

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const response: IResponse = await new PersonsService().getAll();
      return res.status(response.code).json(response.body);
    } catch (error) {
      console.error('Error al obtener personas:', error);
      return res
        .status(HttpStatus.ERROR_INTERNAL)
        .json('Error al cargar datos.');
    }
  }
}

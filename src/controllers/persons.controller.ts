import { Request, Response } from 'express';
import { HttpStatus, IPerson, IResponse } from '../models';
import { PersonsService } from '../services';
import { PersonsUtils } from '../utils';
export class PersonsController {
  constructor() {}

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const serviceResponse = await new PersonsService().getAll();
      return res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return res.status(HttpStatus.ERROR).send('Error al obtener datos.');
    }
  }
  public async getByRut(req: Request, res: Response): Promise<Response> {
    try {
      const { rut } = req.params;
      const serviceResponse = await new PersonsService().getByRut(rut);
      return res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return res.status(HttpStatus.ERROR).send('Error al obtener datos.');
    }
  }
  public async save(req: Request, res: Response): Promise<Response> {
    try {
      const newPerson: IPerson = PersonsUtils.generateNewPerson(req.body);
      const insertResponse: IResponse = await new PersonsService().save(
        newPerson
      );
      return res.status(insertResponse.code).json(insertResponse);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return res.status(HttpStatus.ERROR).send('Error al insertar datos.');
    }
  }
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const newPersonInfo: IPerson = PersonsUtils.updateInfo(req.body);
      const updateResponse: IResponse = await new PersonsService().update(
        newPersonInfo
      );
      return res.status(updateResponse.code).json(updateResponse);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.ERROR).send('1Error al actualizar datos.');
    }
  }
}

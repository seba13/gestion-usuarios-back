import { Request, Response } from 'express';
import { HttpStatus, IResponse } from '../models';
import { EmployeeService } from '../services/employee.service';
export class EmployeeController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const serviceResponse = await new EmployeeService().getAll();
      return res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return res.status(HttpStatus.ERROR).send('Error al obtener datos.');
    }
  }
  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { idEmpleado } = req.params;
      const serviceResponse = await new EmployeeService().getById(idEmpleado);
      return res.status(serviceResponse.code).json(serviceResponse);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return res.status(HttpStatus.ERROR).send('Error al obtener datos.');
    }
  }
  public async save(req: Request, res: Response): Promise<Response> {
    try {
      const insertResponse: IResponse = await new EmployeeService().save(
        req.body
      );
      return res.status(insertResponse.code).json(insertResponse);
    } catch (error: any) {
      return res.status(HttpStatus.ERROR).json(error);
    }
  }
  //   public async update(req: Request, res: Response): Promise<Response> {
  //     try {
  //       const newPersonInfo: IPerson = PersonsUtils.updateInfo(
  //         req.body,
  //         req.params.idPersona
  //       );
  //       const updateResponse: IResponse = await new PersonsService().update(
  //         newPersonInfo
  //       );
  //       return res.status(updateResponse.code).json(updateResponse);
  //     } catch (error) {
  //       console.log(error);
  //       return res.status(HttpStatus.ERROR).send('1Error al actualizar datos.');
  //     }
  //   }
  public async test(req: Request, res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).json('ok');
  }
}

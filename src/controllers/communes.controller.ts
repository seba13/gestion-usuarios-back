import { CommuneService } from '../services';
import { Request, Response } from 'express';
export class CommuneController {
  public async getCommunes(req: Request, res: Response): Promise<Response> {
    try {
      const existsUser = await new CommuneService().getCommunes();
      return res.status(existsUser.code).json(existsUser);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al autenticar');
    }
  }
  public async getRegions(req: Request, res: Response): Promise<Response> {
    try {
      const existsUser = await new CommuneService().getRegiones();
      return res.status(existsUser.code).json(existsUser);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al autenticar');
    }
  }
  public async getProvinces(req: Request, res: Response): Promise<Response> {
    try {
      const existsUser = await new CommuneService().getProvinces();
      return res.status(existsUser.code).json(existsUser);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al autenticar');
    }
  }
}

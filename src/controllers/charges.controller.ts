import { ChargesService } from '../services';
import { Request, Response } from 'express';
export class ChargesController {
  public async getCharges(req: Request, res: Response): Promise<Response> {
    try {
      const charges = await new ChargesService().getAllCharges();
      return res.status(charges.code).json(charges);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al autenticar');
    }
  }
}

import { LettersService } from '../services';
import { Request, Response } from 'express';
export class LettersController {
  public async getLetters(req: Request, res: Response): Promise<Response> {
    try {
      const letters = await new LettersService().getLetters();
      return res.status(letters.code).json(letters);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al autenticar');
    }
  }
  public async getLetterByRut(req: Request, res: Response): Promise<Response> {
    try {
      const letters = await new LettersService().getLetterByRut(req);
      return res.status(letters.code).json(letters);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al autenticar');
    }
  }
  public async saveNewLetter(req: Request, res: Response): Promise<Response> {
    try {
      const letters = await new LettersService().saveLetter(req);
      return res.status(letters.code).json(letters);
    } catch (error) {
      console.error('ERROR: ', error);
      throw new Error('Error al autenticar');
    }
  }
}

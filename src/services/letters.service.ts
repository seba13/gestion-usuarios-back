import { LettersRepository } from '../repository';
import { ILetter, IResponse } from '../models';
import { EmployeeUtils, ServerResponse } from '../utils';

export class LettersService {
  private repository: LettersRepository;

  constructor(repository: LettersRepository = new LettersRepository()) {
    this.repository = repository;
  }

  public async getLetters(): Promise<IResponse> {
    const letters: ILetter[] = await this.repository.getLetters();
    if (!letters.length) {
      return ServerResponse.NotFound('No se encuentran datos.');
    } else {
      return ServerResponse.Ok(letters);
    }
  }
  public async getLetterByRut(req: any | Request): Promise<IResponse> {
    const { rut } = req.params;
    const letters: ILetter[] = await this.repository.getLetterByRut(rut);
    if (!letters.length) {
      return ServerResponse.NotFound('No se encuentran datos.');
    } else {
      return ServerResponse.Ok(letters);
    }
  }
  public async saveLetter(req: any | Request): Promise<IResponse> {
    const { motivo, idTipoCarta, idEmisor, idEmpleado } = req.body;
    const newLetter: ILetter = EmployeeUtils.generateNewLetter(
      idEmisor,
      idTipoCarta,
      motivo
    );
    const letters = await this.repository.saveLetter(idEmpleado, newLetter);
    if (letters.affectedRows === 0) {
      return ServerResponse.NotFound('No se guardo la carta.');
    } else {
      return ServerResponse.Ok('Carta guardada con exito');
    }
  }
}

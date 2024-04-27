import { ChargesRepository } from '../repository';
import { IResponse, ICharge } from '../models';
import { ServerResponse } from '../utils';

export class ChargesService {
  private repository: ChargesRepository;

  constructor(repository: ChargesRepository = new ChargesRepository()) {
    this.repository = repository;
  }

  public async getAllCharges(): Promise<IResponse> {
    const charges: ICharge[] = await this.repository.getCharges();
    if (!charges.length) {
      return ServerResponse.NotFound('No se encuentran datos.');
    } else {
      return ServerResponse.Ok(charges);
    }
  }
}

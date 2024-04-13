import { PersonsRepository } from '../repository/persons.repository';
import { IResponse, IPersons } from '../models';
import { ServerResponse } from '../utils';

export class PersonsService {
  private repository: PersonsRepository;

  constructor() {
    this.repository = new PersonsRepository()!;
  }

  public async getAll(): Promise<IResponse> {
    try {
      const persons: IPersons[] = await this.repository.getAll();
      if (!persons.length) {
        return ServerResponse.NotFound('Personas no encontrados');
      }
      return ServerResponse.Ok(persons);
    } catch (error) {
      console.error('Error al obtener Personas:', error);
      return ServerResponse.Error('Error al buscar datos');
    }
  }
}

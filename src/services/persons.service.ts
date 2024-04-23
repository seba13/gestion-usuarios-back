import { PersonsRepository } from '../repository/persons.repository';
import { IResponse, IPerson } from '../models';
import { ServerResponse } from '../utils';
import { ResultSetHeader } from 'mysql2';

export class PersonsService {
  private repository: PersonsRepository;

  constructor(repository: PersonsRepository = new PersonsRepository()) {
    this.repository = repository;
  }

  public async getAll(): Promise<IResponse> {
    try {
      const persons: IPerson[] = await this.repository.getAll();
      if (!persons.length) {
        return ServerResponse.NotFound('No se encuentran datos.');
      }
      return ServerResponse.Ok(persons);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return ServerResponse.Error('Error al buscar datos.');
    }
  }

  public async getByRut(name: string): Promise<IResponse> {
    try {
      const person: IPerson[] = await this.repository.getByRut(name);

      if (person.length === 0 || person.length < 1) {
        return ServerResponse.NotFound('datos no encontrados');
      }
      return ServerResponse.Ok(person);
    } catch (error) {
      console.error('Error servicio:', error);
      return ServerResponse.ErrorInternalServer('Error al buscar datos');
    }
  }
  public async save(newPerson: IPerson): Promise<IResponse> {
    //procesar logica aca
    try {
      const resultSave: ResultSetHeader = await this.repository.save(newPerson);
      if (!resultSave) {
        return ServerResponse.Error('Error al insertar datos.');
      }
      return ServerResponse.Created();
    } catch (error) {
      console.error(error);
      return ServerResponse.Error('Error al insertar datos.');
    }
  }

  public async update(newPersonInfo: IPerson): Promise<IResponse> {
    const resultUpdate: ResultSetHeader =
      await this.repository.update(newPersonInfo);
    if (resultUpdate.affectedRows === 0 || resultUpdate.affectedRows < 1) {
      return ServerResponse.Error('Error al actualizar datos');
    }
    return ServerResponse.Ok('Cambios realizados');
  }
}

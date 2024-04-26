import { ICommune, IProvince, IRegion, IResponse } from '../models';
import { CommunesRepository } from '../repository';
import { ServerResponse } from '../utils';

export class CommuneService {
  private repository: CommunesRepository;

  constructor(repository: CommunesRepository = new CommunesRepository()) {
    this.repository = repository;
  }

  public async getCommunes(): Promise<IResponse> {
    try {
      const allCommunes: ICommune[] = await this.repository.getCommunes();
      console.log(allCommunes);
      if (!allCommunes) {
        return ServerResponse.NotFound('No se encuentran datos.');
      }
      return ServerResponse.Ok(allCommunes);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return ServerResponse.Error('Error al buscar datos.');
    }
  }
  public async getRegiones(): Promise<IResponse> {
    try {
      const allRegions: IRegion[] = await this.repository.getRegions();
      console.log(allRegions);
      if (!allRegions) {
        return ServerResponse.NotFound('No se encuentran datos.');
      }
      return ServerResponse.Ok(allRegions);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return ServerResponse.Error('Error al buscar datos.');
    }
  }
  public async getProvinces(): Promise<IResponse> {
    try {
      const allProvinces: IProvince[] = await this.repository.getProvinces();
      console.log(allProvinces[0].nombreProvincia);
      if (!allProvinces) {
        return ServerResponse.NotFound('No se encuentran datos.');
      }
      return ServerResponse.Ok(allProvinces);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return ServerResponse.Error('Error al buscar datos.');
    }
  }
}

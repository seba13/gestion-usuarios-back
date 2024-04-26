import pool from '../config/db';
import { ICommune, IProvince, IRegion } from '../models';

export class CommunesRepository {
  private promise;
  constructor() {
    this.promise = pool.promise();
  }
  public async getCommunes(): Promise<ICommune[]> {
    const [row] = await this.promise.query(
      'SELECT comuna_id as idComuna, comuna_nombre as nombreComuna, provincia_id as idProvincia FROM comunas;'
    ); //field is optional
    // console.log(row);
    return row as ICommune[];
  }
  public async getRegions(): Promise<IRegion[]> {
    const [row] = await this.promise.query(
      'SELECT region_id as idRegion, region_nombre as nombreRegion, region_ordinal as regionOrdinal from regiones;'
    ); //field is optional
    // console.log(row);
    return row as IRegion[];
  }
  public async getProvinces(): Promise<IProvince[]> {
    const [row] = await this.promise.query(
      'SELECT provincia_id as idProvincia, provincia_nombre as nombreProvincia from provincias;'
    ); //field is optional
    // console.log(row);
    return row as IProvince[];
  }
}

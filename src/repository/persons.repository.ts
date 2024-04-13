// import { ResultSetHeader } from 'mysql2';
import pool from '../config/db';
import { IPersons } from '../models';

export class PersonsRepository {
  private promise;
  constructor() {
    this.promise = pool.promise();
  }
  public async getAll(): Promise<IPersons[]> {
    const [row] = await this.promise.query('SELECT * FROM personas'); //field is optional
    return row as IPersons[];
  }
}

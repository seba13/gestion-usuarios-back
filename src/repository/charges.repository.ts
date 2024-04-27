import pool from '../config/db';
import { ICharge } from '../models';

export class ChargesRepository {
  private promise;
  constructor() {
    this.promise = pool.promise();
  }
  public async getCharges(): Promise<ICharge[]> {
    const [row] = await this.promise.query(`SELECT * from cargo;`); //field is optional
    // console.log(row);
    return row as ICharge[];
  }
}

// import { ResultSetHeader } from 'mysql2';
import { ResultSetHeader } from 'mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader';
import pool from '../config/db';
import { IPerson } from '../models';

export class PersonsRepository {
  private promise;
  constructor() {
    this.promise = pool.promise();
  }
  public async getAll(): Promise<IPerson[]> {
    const [row] = await this.promise.query('SELECT * from verPersonas;'); //field is optional
    return row as IPerson[];
  }
  public async getById(idPerson: string): Promise<IPerson[]> {
    const [row] = await this.promise.query(
      'select * from personas where id_persona=?;',
      [idPerson]
    );
    // console.log(row);
    return row as IPerson[];
  }
  public async save(newPerson: IPerson): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'call `InsertarPersona`(?,?,?,?,?,?,?,?);',
      [
        newPerson.idPersona,
        newPerson.nombre,
        newPerson.apat,
        newPerson.amat,
        newPerson.fecnac,
        newPerson.rut,
        newPerson.dv,
        newPerson.sexo,
      ]
    ); //field is optional
    console.log(row);
    return row as ResultSetHeader;
  }
  public async update(newPerson: IPerson): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'call ActualizarPersona(?,?,?,?,?,?,?,?)',
      [
        newPerson.idPersona,
        newPerson.nombre,
        newPerson.apat,
        newPerson.amat,
        newPerson.fecnac,
        newPerson.rut,
        newPerson.dv,
        newPerson.sexo,
      ]
    ); //field is optional
    // console.log(row);
    return row as ResultSetHeader;
  }
}

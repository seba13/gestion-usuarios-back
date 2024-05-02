import { ResultSetHeader } from 'mysql2';
import pool from '../config/db';
import { ILetter } from '../models';

export class LettersRepository {
  private promise;
  constructor() {
    this.promise = pool.promise();
  }
  public async getLetters(): Promise<ILetter[]> {
    const [row] = await this.promise.query(
      `SELECT cod_informe as idCarta,
      id_emisor as idEmisor,
      (SELECT CONCAT(p.rut, "-",p.dv) from personas p JOIN empleados em on em.id_persona=p.id_persona where em.id_empleado=inf.id_emisor) as rutEmisor,
      motivo,
      fec_entrega as fecEntrega,
      tipo_carta as idTipoCarta,
      tipo as tipoCarta
  from empleados empl
      JOIN informes inf on inf.id_empleado = empl.id_empleado
      JOIN personas p on p.id_persona=empl.id_persona
      JOIN tipo_informe tf on tf.id=inf.tipo_carta;`
    ); //field is optional
    // console.log(row);
    return row as ILetter[];
  }
  public async getLetterByRut(rut: string): Promise<ILetter[]> {
    const [row] = await this.promise.query(
      `SELECT cod_informe as idCarta,
      id_emisor as idEmisor,
      (SELECT CONCAT(p.rut, "-",p.dv) from personas p JOIN empleados em on em.id_persona=p.id_persona where em.id_empleado=inf.id_emisor) as rutEmisor,
      motivo,
      fec_entrega as fecEntrega,
      tipo_carta as idTipoCarta,
      tipo as tipoCarta
  from empleados empl
      JOIN informes inf on inf.id_empleado = empl.id_empleado
      JOIN personas p on p.id_persona=empl.id_persona
      JOIN tipo_informe tf on tf.id=inf.tipo_carta
      WHERE p.rut=?
      ;`,
      [rut]
    ); //field is optional
    // console.log(row);
    return row as ILetter[];
  }
  public async saveLetter(
    idEmployee: string,
    newLetter: ILetter
  ): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      `INSERT INTO informes VALUES(?,?,?,?,?,?)`,
      [
        newLetter.idCarta,
        idEmployee,
        newLetter.idEmisor,
        newLetter.motivo,
        newLetter.fecEntrega,
        newLetter.idTipoCarta,
      ]
    ); //field is optional
    // console.log(row);
    return row as ResultSetHeader;
  }
}

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
      `SELECT cod_informe as codInforme,
      id_emisor as idEmisor,
      em.id_empleado as idEmpleado,
      nombre as nombre,
      apat as paterno,
      amat as materno,
      concat(rut,"-",dv) as rut,
      motivo,
      fec_entrega as fecEntrega,
      tipo_carta as idTipoCarta,
      tipo as tipoCarta
  from empleados em
      JOIN informes inf on inf.id_empleado = em.id_empleado
      JOIN personas p on p.id_persona=em.id_persona
      JOIN tipo_informe tf on tf.id=inf.tipo_carta;`
    ); //field is optional
    // console.log(row);
    return row as ILetter[];
  }
  public async getLetterByRut(rut: string): Promise<ILetter[]> {
    const [row] = await this.promise.query(
      `SELECT cod_informe as codInforme,
      id_emisor as idEmisor,
      em.id_empleado as idEmpleado,
      nombre as nombre,
      apat as paterno,
      amat as materno,
      concat(rut,"-",dv) as rut,
      motivo,
      fec_entrega as fecEntrega,
      tipo_carta as idTipoCarta,
      tipo as tipoCarta
  from empleados em
      JOIN informes inf on inf.id_empleado = em.id_empleado
      JOIN personas p on p.id_persona=em.id_persona
      JOIN tipo_informe tf on tf.id=inf.tipo_carta
      WHERE p.rut=?
      ;`,
      [rut]
    ); //field is optional
    // console.log(row);
    return row as ILetter[];
  }
  public async saveLetter(newLetter: ILetter): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      `INSERT INTO informes VALUES(?,?,?,?,?,?)`,
      [
        newLetter.idCarta,
        newLetter.idEmpleado,
        newLetter.idEmisor,
        newLetter.motivo,
        newLetter.fechaEntrega,
        newLetter.idTipoCarta,
      ]
    ); //field is optional
    // console.log(row);
    return row as ResultSetHeader;
  }
}

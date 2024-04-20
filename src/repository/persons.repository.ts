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
    const [row] = await this.promise.query(`select
    per.id_persona as idPersona,
    em.id_empleado as idEmpleado,
    per.nombre,
    per.apat as paterno,
    per.amat as materno,
    per.fec_nac as fecNac,
    CONCAT(per.rut,'-',per.dv) as rut,
    if(
        per.sexo = 'm', 'Masculino', 'Femenino'
    ) as sexo,
    CASE
        WHEN detalles.ecv="c" THEN 'Casad@'
        WHEN detalles.ecv="s" THEN 'Solter@'
        WHEN detalles.ecv="d" THEN 'Divorciad@'
        WHEN detalles.ecv="v" THEN 'Viud@'
        ELSE 'Soltero'
    END AS estadoCivil,
    detalles.correo,
    detalles.calle,
    detalles.numero,
    detalles.telefono,
    detalles.profesion,
    reg.region_nombre as region,
    com.comuna_nombre as comuna,
    em.fec_ingreso as fecIngreso,
    em.fec_despido as fecDespido,
    est.estado
from
    personas per
    left join personas_detalles dp on dp.id_persona = per.id_persona
    left join empleados em on em.id_persona = per.id_persona
    left join detalles on detalles.id_detalle = dp.id_detalle
    left join regiones reg on reg.region_id = detalles.region
    left join comunas com on com.comuna_id = detalles.comuna
    left join estados est on est.id_estado = em.estado_empleado;`); //field is optional
    return row as IPerson[];
  }
  public async getById(idPerson: string): Promise<IPerson[]> {
    const [row] = await this.promise.query(
      `select
      per.id_persona as idPersona,
      em.id_empleado as idEmpleado,
      per.nombre,
      per.apat as paterno,
      per.amat as materno,
      per.fec_nac as fecNac,
      CONCAT(per.rut,'-',per.dv) as rut,
      if(
          per.sexo = 'm', 'Masculino', 'Femenino'
      ) as sexo,
      CASE
          WHEN detalles.ecv="c" THEN 'Casad@'
          WHEN detalles.ecv="s" THEN 'Solter@'
          WHEN detalles.ecv="d" THEN 'Divorciad@'
          WHEN detalles.ecv="v" THEN 'Viud@'
          ELSE 'Soltero'
      END AS estadoCivil,
      detalles.correo,
      detalles.calle,
      detalles.numero,
      detalles.telefono,
      detalles.profesion,
      reg.region_nombre as region,
      com.comuna_nombre as comuna,
      em.fec_ingreso as fecIngreso,
      em.fec_despido as fecDespido,
      est.estado
  from
      personas per
      left join personas_detalles dp on dp.id_persona = per.id_persona
      left join empleados em on em.id_persona = per.id_persona
      left join detalles on detalles.id_detalle = dp.id_detalle
      left join regiones reg on reg.region_id = detalles.region
      left join comunas com on com.comuna_id = detalles.comuna
      left join estados est on est.id_estado = em.estado_empleado
      where per.rut=?`,
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
        newPerson.paterno,
        newPerson.materno,
        newPerson.fecNac,
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
        newPerson.paterno,
        newPerson.materno,
        newPerson.fecNac,
        newPerson.rut,
        newPerson.dv,
        newPerson.sexo,
      ]
    ); //field is optional
    // console.log(row);
    return row as ResultSetHeader;
  }
}

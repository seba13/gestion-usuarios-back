// import { ResultSetHeader } from 'mysql2';
import { ResultSetHeader } from 'mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader';
import pool from '../config/db';
import { IEmployee, IPerson } from '../models';
import { RowDataPacket } from 'mysql2';

export class EmployeeRepository {
  private promise;
  constructor() {
    this.promise = pool.promise();
  }
  public async getAll(): Promise<IEmployee[]> {
    const [row] = await this.promise.query(`
    select com.comuna_id as idComuna, com.provincia_id as idProvincia, reg.region_id as idRegion,em.id_empleado as idEmpleado, p.nombre, p.apat as paterno, p.amat as materno, p.fec_nac as fecNac, p.rut as rut, p.dv as dv, 
      p.sexo,detalles.ecv as 'estadoCivil', detalles.correo, detalles.calle, detalles.numero, detalles.telefono, 
      detalles.profesion, reg.region_nombre as region, com.comuna_nombre as comuna, em.fec_ingreso as fecIngreso, em.fec_despido as fecDespido, est.estado 
      from personas_detalles pd
      join personas p on p.id_persona=pd.id_persona
      join empleados em on em.id_persona=pd.id_persona
      join estados est on est.id_estado=em.estado_empleado
      join detalles on detalles.id_detalle=pd.id_detalle
      join regiones reg on reg.region_id=detalles.region
      join comunas com on com.comuna_id=detalles.comuna;`); //field is optional
    return row as IEmployee[];
  }
  public async getById(idEmployee: string): Promise<IEmployee> {
    const [row] = await this.promise.query<RowDataPacket[]>(
      `
      where em.id_empleado=?;`,
      [idEmployee]
    );

    return row[0] as IEmployee;
  }
  public async getByRut(rutEmployee: string): Promise<IEmployee> {
    const [row] = await this.promise.query<RowDataPacket[]>(
      `select com.comuna_id as idComuna, com.provincia_id as idProvincia, reg.region_id as idRegion,em.id_empleado as idEmpleado, p.nombre, p.apat as paterno, p.amat as materno, p.fec_nac as fecNac, p.rut as rut, p.dv as dv, 
        p.sexo,detalles.ecv as 'estadoCivil', detalles.correo, detalles.calle, detalles.numero, detalles.telefono, 
        detalles.profesion, reg.region_nombre as region, com.comuna_nombre as comuna, em.fec_ingreso as fecIngreso, em.fec_despido as fecDespido, est.estado 
        from personas_detalles pd
        join personas p on p.id_persona=pd.id_persona
        join empleados em on em.id_persona=pd.id_persona
        join estados est on est.id_estado=em.estado_empleado
        join detalles on detalles.id_detalle=pd.id_detalle
        join regiones reg on reg.region_id=detalles.region
        join comunas com on com.comuna_id=detalles.comuna
      where p.rut=?;`,
      [rutEmployee]
    );

    return row[0] as IEmployee;
  }
  public async save(
    newEmployee: IEmployee,
    newPerson: IPerson
  ): Promise<ResultSetHeader> {
    const [row] = await this.promise.query(
      'call `NuevoEmpleado`(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
      [
        newEmployee.idEmpleado,
        newPerson.rut,
        newPerson.idPersona,
        newPerson.nombre,
        newPerson.paterno,
        newPerson.materno,
        newPerson.fecNac,
        newPerson.dv,
        newPerson.sexo,
        newEmployee.estadoCivil,
        newEmployee.correo,
        newEmployee.calle,
        newEmployee.numero,
        newEmployee.telefono,
        newEmployee.profesion,
        newEmployee.region,
        newEmployee.comuna,
        newEmployee.estado,
      ]
    );

    return row as ResultSetHeader;
  }
}

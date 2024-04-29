import { v4 as uuid } from 'uuid';
import { IEmployee } from '../models/employee';
export class EmployeeUtils {
  public static generateNewEmployee(body: any): IEmployee {
    const {
      nombre,
      paterno,
      materno,
      fecNac,
      rut,
      dv,
      sexo,
      estadoCivil,
      correo,
      calle,
      numero,
      telefono,
      profesion,
      region,
      comuna,
      cargo,
    } = body;
    const newEmployee: IEmployee = {
      idEmpleado: uuid(),
      nombre: nombre,
      paterno: paterno,
      materno: materno,
      fecNac: fecNac,
      rut: rut,
      dv: dv,
      sexo: sexo,
      estadoCivil: estadoCivil,
      correo: correo,
      calle: calle,
      numero: numero,
      telefono: telefono,
      profesion: profesion,
      region: region,
      comuna: comuna,
      estado: 'f0324771-ebbd-11ee-aa6b-7c4d8fb9ed51',
      cargo: cargo,
      fecIngreso: new Date().toDateString(),
      fecDespido: '',
    };
    return newEmployee;
  }
  public static updateEmployee(req: any): IEmployee {
    const {
      idEmpleado,
      nombre,
      paterno,
      materno,
      fecNac,
      rut,
      dv,
      sexo,
      estadoCivil,
      correo,
      calle,
      numero,
      telefono,
      region,
      comuna,
      profesion,
      estado,
      cargo,
    } = req.body;
    const newInfo: IEmployee = {
      idEmpleado: idEmpleado,
      nombre: nombre,
      paterno: paterno,
      materno: materno,
      fecNac: fecNac,
      rut: rut,
      dv: dv,
      sexo: sexo,
      estadoCivil: estadoCivil,
      correo: correo,
      calle: calle,
      numero: numero,
      telefono: telefono,
      profesion: profesion,
      region: region,
      comuna: comuna,
      // estado: 'f8782666-ebbd-22uu-nn87-7c4d8fb9ed51',
      estado: estado,
      cargo: cargo,
    };
    return newInfo;
  }
}

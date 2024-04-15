import { v4 as uuid } from 'uuid';
import { IEmployee } from '../models/employee';
export class EmployeeUtils {
  public static generateNewEmployee(body: any): IEmployee {
    const {
      nombre,
      apat,
      amat,
      fecnac,
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
    } = body;
    const newEmployee: IEmployee = {
      idEmpleado: uuid(),
      nombre,
      apat,
      amat,
      fecnac,
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
      estado: 'f8782666-ebbd-22uu-nn87-7c4d8fb9ed51',
    };
    return newEmployee;
  }
  // public static updateInfo(body: any, idPersona: string): IPerson {
  //   const { nombre, apat, amat, fecnac, rut, dv, sexo } = body;
  //   const newPersonInfo: IPerson = {
  //     idPersona,
  //     nombre,
  //     apat,
  //     amat,
  //     fecnac,
  //     rut,
  //     dv,
  //     sexo,
  //   };
  //   return newPersonInfo;
  // }
}

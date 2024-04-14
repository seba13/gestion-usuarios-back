import { IPerson } from '../models';
import { v4 as uuid } from 'uuid';
export class PersonsUtils {
  public static generateNewPerson(body: any): IPerson {
    const { nombre, apat, amat, fecnac, rut, dv, sexo } = body;
    const newPerson: IPerson = {
      idPersona: uuid(),
      nombre,
      apat,
      amat,
      fecnac,
      rut,
      dv,
      sexo,
    };
    return newPerson;
  }
  public static updateInfo(body: any, idPersona: string): IPerson {
    const { nombre, apat, amat, fecnac, rut, dv, sexo } = body;
    const newPersonInfo: IPerson = {
      idPersona,
      nombre,
      apat,
      amat,
      fecnac,
      rut,
      dv,
      sexo,
    };
    return newPersonInfo;
  }
}

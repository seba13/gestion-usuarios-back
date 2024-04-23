import { IPerson } from '../models';
import { v4 as uuid } from 'uuid';
export class PersonsUtils {
  public static generateNewPerson(body: any): IPerson {
    const { nombre, paterno, materno, fecNac, rut, dv, sexo } = body;
    const newPerson: IPerson = {
      idPersona: uuid(),
      nombre,
      paterno,
      materno,
      fecNac,
      rut,
      dv,
      sexo,
    };
    return newPerson;
  }
  public static updateInfo(body: any): IPerson {
    const { nombre, paterno, materno, fecNac, rut, dv, sexo } = body;
    const newPersonInfo: IPerson = {
      nombre,
      paterno,
      materno,
      fecNac,
      rut,
      dv,
      sexo,
    };
    return newPersonInfo;
  }
}

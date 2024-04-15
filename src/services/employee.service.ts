import { EmployeeRepository } from '../repository';
import { EmployeeUtils, PersonsUtils, ServerResponse } from '../utils';
import { IPerson, IResponse, IEmployee } from '../models';
export class EmployeeService {
  private repository: EmployeeRepository;

  constructor() {
    this.repository = new EmployeeRepository();
  }

  public async getAll(): Promise<IResponse> {
    const employees: IEmployee[] = await this.repository.getAll();
    if (!employees.length) {
      return ServerResponse.NotFound('No se encuentran datos.');
    }
    return ServerResponse.Ok(employees);
  }

  public async getById(idEmployee: string): Promise<IResponse> {
    try {
      const employee: IEmployee[] = await this.repository.getById(idEmployee);

      if (employee.length === 0 || employee.length < 1) {
        return ServerResponse.NotFound('datos no encontrados');
      }
      return ServerResponse.Ok(employee);
    } catch (error) {
      console.error('Error servicio:', error);
      return ServerResponse.ErrorInternalServer('Error al buscar datos');
    }
  }
  public async save(body: object): Promise<IResponse> {
    try {
      const newEmployee: IEmployee = EmployeeUtils.generateNewEmployee(body);
      const newPerson: IPerson = PersonsUtils.generateNewPerson(newEmployee);
      const resultSave = await this.repository.save(newEmployee, newPerson);
      //procesar respuesta
      console.log('RESULTADO:');
      console.log(resultSave);
      // Procesar respuesta
      if (resultSave.affectedRows) {
        return ServerResponse.Error('No se creo el registro');
      }
      return ServerResponse.Ok('Empleado creado');
    } catch (error: any) {
      return ServerResponse.Error(error.message);
    }
  }

  // public async update(newPersonInfo: IPerson): Promise<IResponse> {
  //   console.log(newPersonInfo);
  //   const resultUpdate: ResultSetHeader =
  //     await this.repository.update(newPersonInfo);
  //   if (resultUpdate.affectedRows === 0 || resultUpdate.affectedRows < 1) {
  //     return ServerResponse.Error('Error al actualizar datos');
  //   }
  //   return ServerResponse.Ok('Cambios realizados');
  // }
}

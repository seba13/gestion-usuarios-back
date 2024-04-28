import { EmployeeRepository } from '../repository';
import { EmployeeUtils, PersonsUtils, ServerResponse } from '../utils';
import { IPerson, IResponse, IEmployee } from '../models';
import { ResultSetHeader } from 'mysql2';
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
      const employee: IEmployee = await this.repository.getById(idEmployee);
      if (!employee) {
        return ServerResponse.NotFound('datos no encontrados');
      }
      return ServerResponse.Ok(employee);
    } catch (error) {
      console.error('Error servicio:', error);
      return ServerResponse.ErrorInternalServer('Error al buscar datos');
    }
  }
  public async getByRut(rut: string): Promise<IResponse> {
    try {
      const employee: IEmployee = await this.repository.getByRut(rut);
      console.log(employee);
      if (!employee) {
        return ServerResponse.NotFound('datos no encontrados');
      }
      return ServerResponse.Ok(employee);
    } catch (error) {
      console.error('Error servicio:', error);
      return ServerResponse.ErrorInternalServer('Error al buscar datos');
    }
  }
  public async save(body: any): Promise<IResponse> {
    try {
      const newEmployee: IEmployee = EmployeeUtils.generateNewEmployee(body);
      const newPerson: IPerson = PersonsUtils.generateNewPerson(newEmployee);
      const resultSave = await this.repository.save(newEmployee, newPerson);
      // Procesar respuesta
      if (resultSave.affectedRows === 0 || !resultSave) {
        return ServerResponse.Error('No se creo el registro');
      }
      return ServerResponse.Ok('Empleado creado');
    } catch (error: any) {
      console.log(error);
      return ServerResponse.Error(error.message);
    }
  }

  public async update(newEmployeeInfo: IEmployee): Promise<IResponse> {
    const resultUpdate: ResultSetHeader =
      await this.repository.update(newEmployeeInfo);
    console.log(resultUpdate);
    if (resultUpdate.affectedRows === 0) {
      return ServerResponse.Error('Error al actualizar datos');
    }
    return ServerResponse.Ok('Cambios realizados');
  }
}

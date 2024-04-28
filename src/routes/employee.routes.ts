import { Router } from 'express';
import { EmployeeController } from '../controllers';
import { EmployeeDTO } from '../dto';

export const employeeRouter = Router();
const controller = new EmployeeController();
const middlewareDTO = new EmployeeDTO();
// Endpoint de login con el middleware de autenticación
employeeRouter.get('/empleados', controller.getAll);
employeeRouter.get(
  '/empleado/id/:idEmpleado',
  middlewareDTO.validateGetByIdDTO,
  controller.getById
);
employeeRouter.get(
  '/empleado/rut/:rut',
  middlewareDTO.validateGetByRutDTO,
  controller.getByRut
);
employeeRouter.post(
  '/empleado',
  middlewareDTO.validateNewEmployeeDTO,
  controller.save
);
employeeRouter.patch(
  '/empleado',
  middlewareDTO.validateUpdateEmployeeDTO,
  controller.update
);

export default employeeRouter;

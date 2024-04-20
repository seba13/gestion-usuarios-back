import { Router } from 'express';
import { EmployeeController } from '../controllers';
import { UserDTO } from '../dto';

export const employeeRouter = Router();
const controller = new EmployeeController();
const middlewareDto = new UserDTO();
// Endpoint de login con el middleware de autenticación
employeeRouter.get('/empleados', controller.getAll);
employeeRouter.get('/empleado/:idEmpleado', controller.getById);
employeeRouter.post(
  '/empleado',
  middlewareDto.validateNewEmployeeDTO,
  controller.save
);

export default employeeRouter;

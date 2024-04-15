import { Router } from 'express';
import { EmployeeController } from '../controllers';

export const employeeRouter = Router();
const controller = new EmployeeController();

// Endpoint de login con el middleware de autenticación
employeeRouter.get('/empleados', controller.getAll);
employeeRouter.get('/empleado/:idEmpleado', controller.getById);
employeeRouter.post('/empleado', controller.save);

export default employeeRouter;

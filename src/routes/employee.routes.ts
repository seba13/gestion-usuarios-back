import { Router } from 'express';
import { EmployeeController } from '../controllers';

export const employeeRouter = Router();
const controller = new EmployeeController();

// Endpoint de login con el middleware de autenticación
employeeRouter.get('/empleados/ver', controller.getAll);
employeeRouter.get('/empleados/buscar/:idEmpleado', controller.getById);
employeeRouter.post('/empleados/registrar', controller.save);

export default employeeRouter;

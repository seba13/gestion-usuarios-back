import { Router } from 'express';
import { UsersController } from '../controllers';
export const usersRouter = Router();

const controller: UsersController = new UsersController();

usersRouter.get('/usuarios', controller.getAll);
usersRouter.get('/usuario/:idUsuario', controller.getById);
usersRouter.post('/usuario', controller.save);
usersRouter.patch('/usuario', controller.update); //arreglar trycatch por errores de registro

export default usersRouter;

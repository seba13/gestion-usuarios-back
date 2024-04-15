import { Router } from 'express';
import { UsersController } from '../controllers';
export const usersRouter = Router();

const controller: UsersController = new UsersController();

usersRouter.get('/usuarios/ver', controller.getAll);
usersRouter.get('/usuario/buscar/:idUsuario', controller.getById);
usersRouter.post('/usuario/registrar', controller.save);
usersRouter.patch('/usuario/actualizar/:idUsuario', controller.update); //arreglar trycatch por errores de registro

export default usersRouter;

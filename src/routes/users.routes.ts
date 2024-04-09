import { Router } from 'express';
import { UsersControllers } from '../controllers/users.controller';
export const usersRouter = Router();

const controller: UsersControllers = new UsersControllers();

usersRouter.get('/usuarios', controller.getAll);
usersRouter.get('/usuario/:usuario', controller.getById);
usersRouter.post('/usuario', controller.save);
usersRouter.patch('/usuario', controller.update);

export default usersRouter;

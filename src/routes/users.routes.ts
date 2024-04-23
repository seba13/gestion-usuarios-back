import { Router } from 'express';
import { UsersController } from '../controllers';
import { UserDTO } from '../dto';
export const usersRouter = Router();

const controller: UsersController = new UsersController();
const middlewareDTO = new UserDTO();
usersRouter.get('/usuarios', controller.getAll);
usersRouter.get(
  '/usuario/:idUsuario',
  middlewareDTO.validateGetByIdDTO,
  controller.getByUsername
);
usersRouter.post('/usuario', middlewareDTO.validateNewUserDTO, controller.save);
usersRouter.patch(
  '/usuario',
  middlewareDTO.validateUpdateUserDTO,
  controller.update
); //arreglar trycatch por errores de registro

export default usersRouter;

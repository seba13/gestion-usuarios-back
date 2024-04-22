import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserDTO } from '../dto';

export const authRouter = Router();
const controller = new AuthController();
const middleware = new AuthMiddleware();
const middlewareDto = new UserDTO();

// Endpoint de login con el middleware de autenticación
authRouter.post(
  '/auth-user',
  middlewareDto.validateLoginDTO,
  controller.authenticate
);
authRouter.get('/closeSession/:userId', controller.closeSession);
// authRouter.get('/protected', middleware.verifyToken, controller.test);

export default authRouter;

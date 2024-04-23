import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthDTO } from '../dto';

export const authRouter = Router();
const controller = new AuthController();
const middleware = new AuthMiddleware();
const middlewareDTO = new AuthDTO();

// Endpoint de login con el middleware de autenticación
authRouter.post(
  '/auth-user',
  middlewareDTO.validateLoginDTO,
  controller.authenticate
);
authRouter.get(
  '/exit/:userId',
  middlewareDTO.validateExitIdDTO,
  controller.closeSession
);
authRouter.get('/protected', middleware.verifyToken, controller.test);

export default authRouter;

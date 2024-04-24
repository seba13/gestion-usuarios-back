import { Router } from 'express';
import { AuthController } from '../controllers';
// import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthDTO, TokenDTO } from '../dto';

export const authRouter = Router();
const controller = new AuthController();
// const middleware = new AuthMiddleware();

// Endpoint de login con el middleware de autenticación
authRouter.get(
  '/verify',
  TokenDTO.validateTokenDTO,
  controller.verifyIncomingToken
); //verify?token=238127ahsdsjashd
authRouter.post(
  '/auth-user',
  AuthDTO.validateLoginDTO,
  AuthController.authenticate
);
authRouter.get(
  '/exit/:userId',
  AuthDTO.validateExitIdDTO,
  controller.closeSession
);
// authRouter.get('/protected', middleware.verifyToken, controller.test);

export default authRouter;

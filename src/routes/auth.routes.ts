import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthDTO, TokenDTO } from '../dto';

export const authRouter = Router();
const controller = new AuthController();

authRouter.get('/verifyToken', controller.verifyCookieToken);
authRouter.get(
  '/verifyAccess',
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
authRouter.get('/protected', AuthMiddleware.verifyToken, (req, res) => {
  res.send('TEST');
});

export default authRouter;

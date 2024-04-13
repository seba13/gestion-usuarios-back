import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const authRouter = Router();
const controller = new AuthController();
const middleware = new AuthMiddleware();

// Endpoint de login con el middleware de autenticación
authRouter.post('/auth-user', controller.authenticate);
authRouter.get('/protected', middleware.verifyToken, controller.test);

export default authRouter;

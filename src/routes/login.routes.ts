import { Router } from 'express';
import { LoginController } from '../controllers/login.controller';

export const loginRouter = Router();
const controller = new LoginController();

loginRouter.post('/login', controller.login);

export default loginRouter;
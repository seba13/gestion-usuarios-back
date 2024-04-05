import { Router } from 'express';
import { LoginController } from '../controllers/login.controller';
// import { LoginController } from '../controllers/login.controller';
// import { authenticateToken } from '../middlewares/auth.middleware';

export const login = Router();
// const authController = new AuthController();
const loginController = new LoginController();

// auth.get('/protected', authenticateToken, authController.protectedRoute);
// login.post('/login1', authController.login);
login.post('/login', loginController.login);

export default login;

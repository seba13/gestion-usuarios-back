import { Router } from 'express';
import { ChargesController } from '../controllers';

export const chargesRoutes = Router();
const controller = new ChargesController();

chargesRoutes.get('/cargos', controller.getCharges);

export default chargesRoutes;

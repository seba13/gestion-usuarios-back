import { Router } from 'express';
import { CommuneController } from '../controllers';

export const communesRouter = Router();
const controller = new CommuneController();

communesRouter.get('/comunas', controller.getCommunes);
communesRouter.get('/regiones', controller.getRegions);
communesRouter.get('/provincias', controller.getProvinces);

export default communesRouter;

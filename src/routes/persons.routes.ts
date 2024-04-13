import { Router } from 'express';
import { PersonsController } from '../controllers';

export const personsRouter = Router();
const controller = new PersonsController();

personsRouter.get('/personas', controller.getAll);
personsRouter.post('/persona/registrar', controller.getAll);

export default personsRouter;

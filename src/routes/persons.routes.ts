import { Router } from 'express';
import { PersonsController } from '../controllers';

export const personsRouter = Router();
const controller = new PersonsController();

personsRouter.get('/personas', controller.getAll);
personsRouter.get('/persona/:idpersona', controller.getById);
personsRouter.post('/persona', controller.save);
personsRouter.patch('/persona/:idPersona', controller.update);

export default personsRouter;

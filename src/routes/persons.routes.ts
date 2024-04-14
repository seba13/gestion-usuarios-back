import { Router } from 'express';
import { PersonsController } from '../controllers';

export const personsRouter = Router();
const controller = new PersonsController();

personsRouter.get('/personas/ver', controller.getAll);
personsRouter.get('/persona/buscar/:idpersona', controller.getById);
personsRouter.post('/persona/registrar', controller.save);
personsRouter.patch('/persona/actualizar/:idPersona', controller.update);

export default personsRouter;

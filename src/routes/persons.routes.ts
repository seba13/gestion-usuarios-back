import { Router } from 'express';
import { PersonsController } from '../controllers';

export const personsRouter = Router();
const controller = new PersonsController();

personsRouter.get('/personas/ver', controller.getAll);
personsRouter.get('/personas/buscar/:idpersona', controller.getById);
personsRouter.post('/personas/registrar', controller.save);
personsRouter.patch('/personas/actualizar/:idPersona', controller.update);

export default personsRouter;

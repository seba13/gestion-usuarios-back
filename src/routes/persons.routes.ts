import { Router } from 'express';
import { PersonsController } from '../controllers';
import { PersonDTO } from '../dto';
export const personsRouter = Router();
const controller = new PersonsController();
const middlewareDTO = new PersonDTO();
personsRouter.get('/personas', controller.getAll);
personsRouter.get(
  '/persona/:rut',
  middlewareDTO.validateGetByRutDTO,
  controller.getByRut
);
personsRouter.post(
  '/persona',
  middlewareDTO.validateSavePersonDTO,
  controller.save
);
personsRouter.patch(
  '/persona',
  middlewareDTO.validateUpdatePersonaDTO,
  controller.update
);

export default personsRouter;

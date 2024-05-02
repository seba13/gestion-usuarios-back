import { Router } from 'express';
import { LettersController } from '../controllers';
import { LetterDTO, PersonDTO } from '../dto';

export const lettersRouter = Router();
const controller = new LettersController();
const middlewareDTO = new PersonDTO();

lettersRouter.get('/cartas', controller.getLetters);
lettersRouter.get(
  '/cartas/:rut',
  middlewareDTO.validateGetByRutDTO,
  controller.getLetterByRut
);
lettersRouter.post(
  '/carta',
  LetterDTO.validateNewLetterDTO,
  controller.saveNewLetter
);

export default lettersRouter;

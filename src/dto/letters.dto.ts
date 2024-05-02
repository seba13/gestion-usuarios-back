import { Request, Response, NextFunction } from 'express';
import { ServerResponse } from '../utils';
import { HttpStatus } from '../models';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

export class LetterDTO {
  public static validateNewLetterDTO(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    const dataRequired = req.body;
    const schema = {
      type: 'object',
      properties: {
        idEmisor: { type: 'string' },
        idEmpleado: { type: 'string' },
        idTipoCarta: { type: 'number' },
        motivo: { type: 'string' },
      },
      required: ['idEmisor', 'idEmpleado', 'idTipoCarta', 'motivo'],
      additionalProperties: false,
    };

    const ajv: Ajv = new Ajv({ allErrors: true });
    addErrors(ajv);
    const validate = ajv.compile(schema);
    const isDtoValid = validate(dataRequired);
    if (!isDtoValid) {
      res
        .status(HttpStatus.ERROR)
        .json(
          ServerResponse.Error(
            ajv.errorsText(validate.errors, { separator: '\n' })
          )
        );
    } else {
      console.log('DTO SUCCESS.');
      next();
    }
  }
}

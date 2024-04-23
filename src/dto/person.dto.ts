import { Request, Response, NextFunction } from 'express';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import { HttpStatus } from '../models';
import { ServerResponse } from '../utils';
export class PersonDTO {
  public validateGetByRutDTO(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    // const dataRequired = req.body;
    const dataRequired = req.params;
    const schema = {
      type: 'object',
      properties: {
        rut: { type: 'string' },
      },
      required: ['rut'],
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

  public validateSavePersonDTO(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): any {
    const dataRequired = req.body;

    const schema = {
      type: 'object',
      properties: {
        rut: { type: 'string' },
        dv: { type: 'string' },
        nombre: { type: 'string' },
        paterno: { type: 'string' },
        materno: { type: 'string' },
        sexo: { type: 'string' },
        fecNac: { type: 'string' },
      },
      required: ['rut', 'dv', 'nombre', 'paterno', 'materno', 'sexo', 'fecNac'],
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
  public validateUpdatePersonaDTO(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): any {
    const dataRequired = req.body;

    const schema = {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        paterno: { type: 'string' },
        materno: { type: 'string' },
        rut: { type: 'string' },
        dv: { type: 'string' },
        sexo: { type: 'string' },
        fecNac: { type: 'string' },
      },
      required: ['rut', 'dv', 'nombre', 'paterno', 'materno', 'sexo', 'fecNac'],
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

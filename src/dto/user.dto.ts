import { Request, Response, NextFunction } from 'express';
import { ServerResponse } from '../utils';
import { HttpStatus } from '../models';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

export class UserDTO {
  public validateUpdateUserDTO(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    const dataRequired = req.body;
    console.log(dataRequired);
    const schema = {
      type: 'object',
      properties: {
        usuario: { type: 'string' },
        contrasena: { type: 'string' },
      },
      required: ['usuario', 'contrasena'],
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
  public validateNewUserDTO(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    const dataRequired = req.body;
    console.log(dataRequired);
    const schema = {
      type: 'object',
      properties: {
        usuario: { type: 'string' },
        contrasena: { type: 'string' },
      },
      required: ['usuario', 'contrasena'],
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
  public validateGetByIdDTO(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    const dataRequired = req.params;
    console.log(dataRequired);
    const schema = {
      type: 'object',
      properties: {
        idUsuario: { type: 'string' },
      },
      required: ['idUsuario'],
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

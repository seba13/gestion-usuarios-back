import { NextFunction } from 'express';
import { HttpStatus } from '../models';
import { ServerResponse } from '../utils';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
export class EmployeeDTO {
  public validateUpdateEmployeeDTO(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    // const dataRequired = req.body;
    const dataRequired = req.body;
    const schema = {
      type: 'object',
      properties: {
        idEmpleado: { type: 'string' },
        nombre: { type: 'string' },
        paterno: { type: 'string' },
        materno: { type: 'string' },
        fecNac: { type: 'string' },
        rut: { type: 'string' },
        dv: { type: 'string' },
        sexo: { type: 'string' },
        estadoCivil: { type: 'string' },
        correo: { type: 'string' },
        calle: { type: 'string' },
        numero: { type: 'string' },
        telefono: { type: 'string' },
        profesion: { type: 'string' },
        estado: { type: 'string' },
        region: { type: 'number' },
        comuna: { type: 'number' },
      },
      required: [
        'idEmpleado',
        'nombre',
        'paterno',
        'materno',
        'fecNac',
        'rut',
        'dv',
        'sexo',
        'estadoCivil',
        'correo',
        'calle',
        'numero',
        'telefono',
        'region',
        'comuna',
      ],
      additionalProperties: false,
    };

    const ajv: Ajv = new Ajv({ allErrors: true });
    addErrors(ajv);
    const validate = ajv.compile(schema);
    const isDtoValid = validate(dataRequired);
    console.log(dataRequired);
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
  public validateNewEmployeeDTO(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    // const dataRequired = req.body;
    const dataRequired = req.body;
    const schema = {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        paterno: { type: 'string' },
        materno: { type: 'string' },
        fecNac: { type: 'string' },
        rut: { type: 'string' },
        dv: { type: 'string' },
        sexo: { type: 'string' },
        estadoCivil: { type: 'string' },
        correo: { type: 'string' },
        calle: { type: 'string' },
        numero: { type: 'string' },
        telefono: { type: 'string' },
        region: { type: 'number' },
        comuna: { type: 'number' },
      },
      required: [
        'nombre',
        'paterno',
        'materno',
        'fecNac',
        'rut',
        'dv',
        'sexo',
        'estadoCivil',
        'correo',
        'calle',
        'numero',
        'telefono',
        'region',
        'comuna',
      ],
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
    res: Response | any,
    next: NextFunction
  ): any {
    const dataRequired = req.params;
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
  public validateGetByRutDTO(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): any {
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
}

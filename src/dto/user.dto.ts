import { Request, Response, NextFunction } from 'express';
import { ServerResponse } from '../utils';
import Ajv from 'ajv';
import { HttpStatus } from '../models';
import { Type } from '@sinclair/typebox';
import addErrors from 'ajv-errors';

export class UserDTO {
  public validateLoginDTO(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    const dataRequired = req.body;
    const loginDto = {
      type: 'object',
      properties: {
        usuario: { type: 'string' },
        contrasena: { type: 'string' },
      },
      required: ['usuario', 'contrasena'],
      additionalProperties: false,
    };
    const loginDto2 = Type.Object(
      {
        usuario: Type.String({
          format: 'El formato esta incorrecto',
          errorMessage: 'Campo string esperado',
        }),
        contrasena: Type.String({
          format: 'El formato esta incorrecto',
          errorMessage: 'Campo string esperado',
        }),
      },
      { required: ['usuario', 'contrasena'], additionalProperties: false }
    );
    const ajv = new Ajv({ allErrors: true });
    addErrors(ajv);
    const validate = ajv.compile(loginDto);
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
  public validateNewEmployeeDTO(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    const dataRequired = req.body;
    const employeeSchema = {
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
    const ajv = new Ajv({ allErrors: true });
    const isDataValid = ajv.validate(employeeSchema, dataRequired);
    if (!isDataValid) {
      res
        .status(HttpStatus.ERROR)
        .json(ServerResponse.Error('Body de la peticion invalido.'));
    } else {
      console.log('DTO SUCCESS.');
      next();
    }
  }
}

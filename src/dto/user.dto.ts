import { Request, Response, NextFunction } from 'express';
import { ServerResponse } from '../utils';
import { Type } from '@sinclair/typebox';
import addFormat from 'ajv-formats';
import addErors from 'ajv-errors';
import Ajv from 'ajv';
import { HttpStatus } from '../models';

export class UserDTO {
  public validateLoginDTO(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    const schema = {
      type: 'object',
      properties: {
        usuario: { type: 'string' },
        contrasena: { type: 'string' },
      },
      // required: ['usuario', 'contrasena'],
      additionalProperties: false,
    };
    // const validate = new Ajv().compile(schema);
    // const schema = Type.Object(
    //   {
    //     usuario: Type.String({
    //       format: 'usuario',
    //       errorMessage: '',
    //     }),
    //     contrasena: Type.String(),
    //   },
    //   { additionalProperties: false }
    // );
    // addFormat(ajv, ['usuario', 'contrasena'])
    // .addKeyword('kind')
    // .addKeyword('modifier');
    // addErors(ajv);
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const data = req.body;

    const isDtoValid = validate(data);
    if (!isDtoValid) {
      const error = ServerResponse.Error('Body de la peticion invalido.');
      // console.log(validate.errors);
      res.status(error.code).json(error);
    } else {
      console.log('DTO SUCCESS.');
      next();
    }
  }
}

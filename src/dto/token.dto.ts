import { Request, Response, NextFunction } from 'express';
import { ServerResponse } from '../utils';
import { HttpStatus } from '../models';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

export class TokenDTO {
  public static validateTokenDTO(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): any {
    // de manera regular con la libreria
    const dataRequired = req.query;
    const schema = {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
      required: ['token'],
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
  public static validateCookieDTO(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // Verificar si la cookie está presente
    const cookieToken = req.cookies && req.cookies['cookie-token'];

    if (!cookieToken) {
      return res
        .status(HttpStatus.ERROR)
        .json(
          ServerResponse.Error('Cookie token no encontrado en la solicitud.')
        );
    }

    // Definir el esquema de validación
    const schema = {
      type: 'object',
      properties: {
        cookieToken: { type: 'string' },
      },
      required: ['cookieToken'],
      additionalProperties: false,
    };

    // Crear el validador Ajv
    const ajv = new Ajv({ allErrors: true });
    addErrors(ajv);
    const validate = ajv.compile(schema);

    // Validar la cookie
    const isDtoValid = validate({ cookieToken });

    if (!isDtoValid) {
      // Enviar respuesta de error si la validación falla
      return res
        .status(HttpStatus.ERROR)
        .json(
          ServerResponse.Error(
            ajv.errorsText(validate.errors, { separator: '\n' })
          )
        );
    }

    // Si la validación es exitosa, pasar al siguiente middleware
    console.log('DTO SUCCESS.');
    next();
  }
}

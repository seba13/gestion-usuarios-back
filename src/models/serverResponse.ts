import { HttpStatus } from './httpStatus';

export interface IResponse {
  code: HttpStatus;
  status: string;
  body?: any;
}

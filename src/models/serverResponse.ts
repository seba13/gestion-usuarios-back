import { HttpStatus } from './httpStatus';

export interface IResponse {
  code: HttpStatus;
  status: string;
  message?: any;
}

import { ResultSetHeader } from 'mysql2';

export interface ILoginUser extends ResultSetHder {
  usuario: string;
  contrasena: string;
}

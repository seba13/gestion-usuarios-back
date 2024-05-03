export interface Token {
  payload: IPayloadType;
}

export type TSecretKey = string | any;
export type TToken = string;
export interface IPayloadType {
  // Define la estructura de tu payload aquí
  idUsuario: string;
  idEmpleado: string;
  usuario: string;
  fecCreacion?: string;
}

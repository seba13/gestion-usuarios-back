export interface IUser {
  idUsuario: string;
  usuario: string;
  contrasena: string;
  rol: string;
  activo: number | any;
  correo: TEmail;
  fecCreacion?: string;
  fecModificacion?: string;
}

export interface IEmail {
  correo: TEmail;
  idEmpleado: string;
}
export type TEmail = string;

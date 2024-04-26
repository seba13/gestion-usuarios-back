export interface IUser {
  idUsuario: string;
  usuario: string;
  contrasena: string;
  rol: string;
  activo: number | any;
  fecCreacion?: string;
  fecModificacion?: string;
}

export interface IEmail {
  correo: string;
  idEmpleado: string;
}
export type TEmail = string;

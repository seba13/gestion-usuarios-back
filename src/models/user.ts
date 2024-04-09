export interface IUser {
  idUsuario: string;
  usuario: string;
  contrasena: string;
  rol: string;
  activo: boolean;
  fecCreacion?: string;
  fecModificacion?: string;
}

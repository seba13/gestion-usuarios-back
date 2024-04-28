export interface IEmployee {
  idEmpleado: string;
  idPersona?: string;
  nombre: string;
  paterno: string;
  materno: string;
  fecNac: string;
  rut: string;
  dv: string;
  sexo: string;
  estadoCivil: string;
  correo: string;
  calle: string;
  numero: string;
  telefono: string;
  profesion: string;
  region: string;
  comuna: string;
  fecIngreso?: string;
  fecDespido?: string;
  estado: string;
}

export type Employee = {
  rut: number;
};

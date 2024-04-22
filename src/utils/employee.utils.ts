import { v4 as uuid } from 'uuid';
import { IEmployee } from '../models/employee';
import PDFDocument from 'pdfkit';
export class EmployeeUtils {
  public static generateNewEmployee(body: any): IEmployee {
    const {
      nombre,
      paterno,
      materno,
      fecNac,
      rut,
      dv,
      sexo,
      estadoCivil,
      correo,
      calle,
      numero,
      telefono,
      profesion,
      region,
      comuna,
    } = body;
    const newEmployee: IEmployee = {
      idEmpleado: uuid(),
      nombre,
      paterno,
      materno,
      fecNac,
      rut,
      dv,
      sexo,
      estadoCivil,
      correo,
      calle,
      numero,
      telefono,
      profesion,
      region,
      comuna,
      estado: 'f8782666-ebbd-22uu-nn87-7c4d8fb9ed51',
    };
    return newEmployee;
  }

  public static async buildPDF(dataCallback: any, endCallback: any) {
    const doc = new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc.fontSize(25).text('hello world', 100, 100);
    doc
      .moveTo(0, 20)
      .lineTo(100, 160)
      .quadraticCurveTo(130, 200, 150, 120)
      .bezierCurveTo(190, -40, 200, 200, 300, 150)
      .lineTo(400, 90)
      .stroke();
    doc.end();
  }
}

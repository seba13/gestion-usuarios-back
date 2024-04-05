import { Router } from 'express';
import { UsuariosController } from '../controllers/usuarios.controller';
export const usuarios = Router();

// const usuarioRepository = new UsuarioRepository();
const usuariosController: UsuariosController = new UsuariosController();

usuarios.get('/usuarios', usuariosController.getAll);
usuarios.get('/usuario/:usuario', usuariosController.getById);
usuarios.post('/usuario', usuariosController.save);
usuarios.patch('/usuario', usuariosController.update);

export default usuarios;

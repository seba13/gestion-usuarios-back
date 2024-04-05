import { Router } from 'express';
import { UsuariosController } from '../controllers/usuarios.controller';
// import { UsuarioRepository } from '../repository/usuario.repository';
export const usuarios = Router();

// const usuarioRepository = new UsuarioRepository();
const usuariosController = new UsuariosController();

// usuarios.get('/usuarios/test', usuariosController.test);

usuarios.get('/usuarios', usuariosController.getAll);
usuarios.get('/usuario/:username', usuariosController.getById);
usuarios.post('/usuario/:newUsername', usuariosController.save);

export default usuarios;

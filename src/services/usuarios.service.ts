import { UsuarioRepository } from '../repository/usuario.repository';

export class UsuariosService {
  public repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  public async getAll(): Promise<any> {
    try {
      const usuarios = await this.repository.getAll();
      //   console.log('Usuarios obtenidos:', usuarios);
      return usuarios;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error; // Re-lanza el error para que lo maneje el código que llamó a getAll()
    }
  }
  public async getById(username: string): Promise<any> {
    try {
      const usuario = await this.repository.getById(username);
      //   console.log('Usuarios obtenidos:', usuario);
      return usuario;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error; // Re-lanza el error para que lo maneje el código que llamó a getAll()
    }
  }

  public async save(user: object): Promise<any> {
    const result = await this.repository.save(user);
    return result;
  }
}

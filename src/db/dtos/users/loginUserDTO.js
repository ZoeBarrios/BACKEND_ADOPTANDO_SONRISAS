export default class loginUserDTO {
  constructor(nombre, contraseña) {
    this.nombre = nombre;
    this.contraseña = contraseña;
  }

  static fromRequest(req) {
    const { nombre, contraseña } = req.body;
    return new loginUserDTO(nombre, contraseña);
  }

  static toResponse(user) {
    return {
      id: user.id,
      nombre: user.name,
      apellido: user.surname,
      email: user.email,
      rol: user.role,
    };
  }
}

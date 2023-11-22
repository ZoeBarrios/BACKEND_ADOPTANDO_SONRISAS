export default class loginUserDTO {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }

  static fromRequest(req) {
    const { name, password } = req.body;
    return new loginUserDTO(name, password);
  }

  static toResponse(user) {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role.role_name,
    };
  }
}

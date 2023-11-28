export default class userDTO {
  constructor(id, name, surname, email, password, role_id) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.role_id = role_id;
  }

  static toResponse(user) {
    const { id, name, surname, email, password, role_id } = user;
    return new userDTO(id, name, surname, email, password, role_id);
  }
}

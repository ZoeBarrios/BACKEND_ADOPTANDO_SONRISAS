export default class userDTO {
  constructor(id, name, surname, email, role_id, phone) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role_id = role_id;
    this.phone = phone;
  }

  static toResponse(user) {
    const { id, name, surname, email, role_id, phone } = user;
    return new userDTO(id, name, surname, email, role_id, phone);
  }
}

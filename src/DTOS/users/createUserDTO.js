export default class createUserDTO {
  constructor(name, surname, email, password, organization_id) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.organization_id = organization_id;
  }

  static fromRequest(request) {
    const { name, surname, email, password, organization_id } = request.body;
    return new createUserDTO(name, surname, email, password, organization_id);
  }
}

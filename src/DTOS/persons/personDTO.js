export default class personDTO {
  constructor(person_id, name, surname, email, role_id, phone) {
    this.person_id = person_id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role_id = role_id;
    this.phone = phone;
  }

  static toResponse(person) {
    const { person_id, name, surname, email, role_id, phone } = person;
    return new personDTO(person_id, name, surname, email, role_id, phone);
  }
}

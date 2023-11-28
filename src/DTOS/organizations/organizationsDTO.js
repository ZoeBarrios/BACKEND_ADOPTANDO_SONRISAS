export default class organizationsDTO {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  static toResponse(organization) {
    return new organizationsDTO(organization.id, organization.name);
  }
}

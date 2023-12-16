export default class organizationsDTO {
  constructor(organization_id, name) {
    this.organization_id = organization_id;
    this.name = name;
  }
  static toResponse(organization) {
    return new organizationsDTO(
      organization.organization_id,
      organization.name
    );
  }
}

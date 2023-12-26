import personDTO from "../persons/personDTO.js";

export default class personOrganizationDTO {
  constructor(isActive, joinedDate, person, activity_id) {
    this.isActive = isActive;
    this.joinedDate = joinedDate;
    this.activity_id = activity_id;

    this.person = personDTO.toResponse(person);
  }
  static toResponse(personOrganization) {
    const { isActive, joinedDate, person, activity_id } = personOrganization;
    return new personOrganizationDTO(isActive, joinedDate, person, activity_id);
  }
}

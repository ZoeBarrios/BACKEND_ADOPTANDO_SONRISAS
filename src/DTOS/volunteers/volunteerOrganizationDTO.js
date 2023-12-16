import organizationDTO from "../organizations/organizationDTO.js";

export default class VolunteerOrganizationDTO {
  constructor(person_id, organization_id, activity, organization) {
    this.person_id = person_id;
    this.organization_id = organization_id;
    this.activity = activity;
    this.organization = organizationDTO.toResponse(organization);
  }

  static toResponse(volunteerOrganization) {
    const { person_id, organization_id, activity, organization } =
      volunteerOrganization;

    return new VolunteerOrganizationDTO(
      person_id,
      organization_id,
      activity,
      organization
    );
  }
}

import organizationDTO from "../organizations/organizationDTO.js";

export default class VolunteerOrganizationDTO {
  constructor(user_id, organization_id, activity, organization) {
    this.user_id = user_id;
    this.organization_id = organization_id;
    this.activity = activity;
    this.organization = organizationDTO.toResponse(organization);
  }

  static toResponse(volunteerOrganization) {
    const { user_id, organization_id, activity, organization } =
      volunteerOrganization;

    return new VolunteerOrganizationDTO(
      user_id,
      organization_id,
      activity,
      organization
    );
  }
}

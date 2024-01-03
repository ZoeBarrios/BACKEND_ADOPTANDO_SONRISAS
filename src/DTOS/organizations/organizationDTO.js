export default class organizationDTO {
  constructor(
    organization_id,
    name,
    description,
    phone,
    email,
    instagram_link,
    facebook_link,
    isAccepted
  ) {
    this.organization_id = organization_id;
    this.name = name;
    this.description = description;
    this.phone = phone;
    this.email = email;
    this.instagram_link = instagram_link;
    this.facebook_link = facebook_link;
    this.isAccepted = isAccepted;
  }

  static toResponse(organization) {
    const {
      organization_id,
      name,
      description,
      phone,
      email,
      instagram_link,
      facebook_link,
      isAccepted,
    } = organization;
    return new organizationDTO(
      organization_id,
      name,
      description,
      phone,
      email,
      instagram_link,
      facebook_link,
      isAccepted
    );
  }
}

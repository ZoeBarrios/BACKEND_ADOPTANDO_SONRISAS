export default class organizationDTO {
  constructor(
    id,
    name,
    description,
    phone,
    email,
    instagram_link,
    facebook_link
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.phone = phone;
    this.email = email;
    this.instagram_link = instagram_link;
    this.facebook_link = facebook_link;
  }

  static toResponse(organization) {
    const {
      id,
      name,
      description,
      phone,
      email,
      instagram_link,
      facebook_link,
    } = organization;
    return new organizationDTO(
      id,
      name,
      description,
      phone,
      email,
      instagram_link,
      facebook_link
    );
  }
}

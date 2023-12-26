export default class updateOrganizationDTO {
  constructor(
    phone,
    email,
    description,

    facebook_link,
    instagram_link
  ) {
    this.phone = phone;
    this.email = email;
    this.description = description;
    this.facebook_link = facebook_link;
    this.instagram_link = instagram_link;
  }

  static fromRequest(req) {
    return new updateOrganizationDTO(
      req.body.phone,
      req.body.email,
      req.body.description,
      req.body.facebook_link,
      req.body.instagram_link
    );
  }
}

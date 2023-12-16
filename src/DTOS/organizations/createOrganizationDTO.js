import organizationSchema from "../../validationSchemes/organizarionScheme.js";
import { ERRORS } from "../../utils/constants.js";
import parseValidationError from "../../utils/parseValidationError.js";

export default class createOrganizationDTO {
  constructor(name, description, phone, email, instagram_link, facebook_link) {
    this.name = name;
    this.description = description;
    this.phone = phone;
    this.email = email;
    this.instagram_link = instagram_link;
    this.facebook_link = facebook_link;
  }

  static fromRequest(request) {
    const { error, value } = organizationSchema.validate(request.body);
    if (error) {
      parseValidationError(error);
    }
    const { name, description, phone, email, instagram_link, facebook_link } =
      request.body;
    return new createOrganizationDTO(
      name,
      description,
      phone,
      email,
      instagram_link,
      facebook_link
    );
  }
}

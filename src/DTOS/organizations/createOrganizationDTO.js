import organizationSchema from "../../../validationSchemes/organizarionScheme.js";
import { ERRORS } from "../../utils/constants.js";

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
      const errorMessages = error.details.map((err) => {
        if (err.type === "any.required") {
          return `El campo ${err.context.key} es obligatorio`;
        }
        return err.message;
      });
      const infError = {
        ...ERRORS.ValidationError,
        message: errorMessages,
      };
      throw infError;
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

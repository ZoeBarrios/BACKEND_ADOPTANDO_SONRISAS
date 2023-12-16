import personScheme from "../../validationSchemes/personScheme.js";
import parseValidationError from "../../utils/parseValidationError.js";
export default class CreateUserDTO {
  constructor(name, surname, email, password, organization_id, phone) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.organization_id = organization_id;
    this.phone = phone;
  }

  static fromRequest(request) {
    const { error, value } = personScheme.validate(request.body);

    if (error) {
      parseValidationError(error);
    }

    return new CreateUserDTO(
      value.name,
      value.surname,
      value.email,
      value.password,
      value.organization_id,
      value.phone
    );
  }
}

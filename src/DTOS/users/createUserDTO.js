import userSchema from "../../../validationSchemes/userScheme.js";
import { ERRORS } from "../../utils/constants.js";
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
    const { error, value } = userSchema.validate(request.body);

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

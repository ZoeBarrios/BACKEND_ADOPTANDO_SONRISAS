import loginSchema from "../../validationSchemes/loginScheme.js";
import parseValidationError from "../../utils/parseValidationError.js";
export default class loginUserDTO {
  constructor(nameOrEmail, password) {
    this.nameOrEmail = nameOrEmail;
    this.password = password;
  }

  static fromRequest(req) {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      parseValidationError(error);
    }
    const { nameOrEmail, password } = req.body;
    return new loginUserDTO(nameOrEmail, password);
  }

  static toResponse(person) {
    return {
      id: person.person_id,
      name: person.name,
      surname: person.surname,
      email: person.email,
      phone: person.phone,
      role: person.role.role_name,
    };
  }
}

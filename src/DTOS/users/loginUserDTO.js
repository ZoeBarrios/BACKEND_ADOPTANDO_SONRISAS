import loginSchema from "../../validationSchemes/loginScheme.js";
import parseValidationError from "../../utils/parseValidationError.js";
export default class loginUserDTO {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }

  static fromRequest(req) {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      parseValidationError(error);
    }
    const { name, password } = req.body;
    return new loginUserDTO(name, password);
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

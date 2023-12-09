import loginSchema from "../../../validationSchemes/loginScheme.js";
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

  static toResponse(user) {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role.role_name,
    };
  }
}

import { compare } from "../services/bcryptService.js";
import { getByUsername } from "../services/personService.js";
import { createToken } from "../services/jwtService.js";
import loginUserDTO from "../DTOS/users/loginUserDTO.js";
import createOrganizationDTO from "../DTOS/organizations/createOrganizationDTO.js";
import { createOrganization } from "../services/organizationService.js";
import organizationDTO from "../DTOS/organizations/organizationDTO.js";
import { ERRORS } from "../utils/constants.js";

export const login = async (req, res, next) => {
  try {
    const { name, password } = loginUserDTO.fromRequest(req);

    const person = await getByUsername(name);
    if (!person) {
      return next(ERRORS.NotFound);
    }

    const isMatch = await compare(password, person.password);

    if (!isMatch) {
      return next(ERRORS.WrongCredentials);
    }
    const UserDTO = loginUserDTO.toResponse(person);
    const token = createToken(UserDTO);
    return res.success(200, { ...UserDTO, token });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const organization = createOrganizationDTO.fromRequest(req);
    const organizationCreated = await createOrganization(organization);
    return res.success(200, organizationDTO.toResponse(organizationCreated));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

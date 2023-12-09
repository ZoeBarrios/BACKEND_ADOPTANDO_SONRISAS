import { compare } from "../services/bcryptService.js";
import { getByUsername } from "../services/userService.js";
import { createToken } from "../services/jwtService.js";
import loginUserDTO from "../DTOS/users/loginUserDTO.js";
import createOrganizationDTO from "../DTOS/organizations/createOrganizationDTO.js";
import { createOrganization } from "../services/organizationService.js";
import organizationDTO from "../DTOS/organizations/organizationDTO.js";
import { ERRORS } from "../utils/constants.js";

export const login = async (req, res, next) => {
  try {
    const { name, password } = loginUserDTO.fromRequest(req);

    const user = await getByUsername(name);
    if (!user) {
      return next(ERRORS.NotFound);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return next(ERRORS.WrongCredentials);
    }
    const UserDTO = loginUserDTO.toResponse(user);
    const token = createToken(UserDTO);
    return res.success(200, { ...UserDTO, token });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  const organization = createOrganizationDTO.fromRequest(req);
  try {
    const organizationCreated = await createOrganization(organization);
    return res.success(200, organizationDTO.toResponse(organizationCreated));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

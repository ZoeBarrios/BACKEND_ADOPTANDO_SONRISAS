import { compare } from "../services/bcryptService.js";
import {
  getByEmail,
  getById,
  getByUsername,
  newPassword,
} from "../services/personService.js";
import {
  createToken,
  getInformationToken,
  verifyToken,
} from "../services/jwtService.js";
import loginUserDTO from "../DTOS/persons/loginUserDTO.js";
import createOrganizationDTO from "../DTOS/organizations/createOrganizationDTO.js";
import { createOrganization } from "../services/organizationService.js";
import organizationDTO from "../DTOS/organizations/organizationDTO.js";
import { ERRORS } from "../utils/errors.js";
import checkEmailOrUser from "../utils/checkEmailOrUser.js";

export const login = async (req, res, next) => {
  try {
    const { nameOrEmail, password } = loginUserDTO.fromRequest(req);
    const { isEmail } = checkEmailOrUser(nameOrEmail);
    console.log(nameOrEmail);
    let person = null;

    if (isEmail) {
      person = await getByEmail(nameOrEmail);
    } else {
      person = await getByUsername(nameOrEmail);
    }

    if (!person) {
      return next(ERRORS.NotFound);
    }

    const isMatch = await compare(password, person.password);

    if (!isMatch) {
      return next(ERRORS.WrongCredentials);
    }
    const personDTO = loginUserDTO.toResponse(person);
    const token = createToken(personDTO);
    return res.success(200, { ...personDTO, token });
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

export const verifyTokenResetPassword = async (req, res, next) => {
  const { token } = req.params;
  try {
    if (verifyToken(token)) {
      const info = getInformationToken(token);
      const person = await getById(info.id);

      if (!person) {
        return next(ERRORS.UserNotFound);
      }

      if (person.token_password == token) {
        const { password } = req.body;
        await newPassword(person, password);
        return res.success(200, "Contraseña actualizada exitosamente");
      } else {
        return next(ERRORS.Unauthorized);
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

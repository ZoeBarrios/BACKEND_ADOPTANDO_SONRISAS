import personDTO from "../DTOS/persons/personDTO.js";
import createPersonDTO from "../DTOS/persons/createPersonDTO.js";
import personOrganizationDTO from "../DTOS/organizations/personOrganizationDTO.js";
import {
  createUser,
  deleteUser,
  getByEmail,
  getById,
  getByUsername,
  updateUser,
} from "../services/personService.js";
import { ERRORS } from "../utils/errors.js";
import CreatePersonOrganization from "../DTOS/persons/createPersonOrganization.js";
import {
  createPersons_Organizationss,
  deletePersons_Organizations,
  getPersonOrganization,
  getPersons_OrganizationsByOrganizationId,
  getPersons_OrganizationsByPersonId,
  updatePersons_Organizations,
} from "../services/person_organizationService.js";
import IdScheme from "../validationSchemes/idScheme.js";
import parseValidationError from "../utils/parseValidationError.js";

export const registerUser = async (req, res, next) => {
  const { role } = req.query;

  try {
    const newUser = createPersonDTO.fromRequest(req);
    const userUsername = await getByUsername(newUser.name);
    const userEmail = await getByEmail(newUser.email);
    if (userUsername || userEmail) {
      return next(ERRORS.UserAlreadyExist);
    }
    let userCreated = newUser;

    if (role) {
      userCreated = await createUser(newUser, role);
    } else {
      return next(ERRORS.WrongRole);
    }

    return res.success(201, personDTO.toResponse(userCreated));
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const person = await getById(id);
    if (!person) {
      return next(ERRORS.UserNotFound);
    }
    return res.success(200, personDTO.toResponse(person));
  } catch (error) {
    next(error);
  }
};

export const updateOneUser = async (req, res, next) => {
  const { id } = req.params;
  const { error, value } = IdScheme.validate({ id });
  if (error) {
    parseValidationError(error);
  }
  try {
    const userUpdated = await updateUser(req.body, id);
    if (!userUpdated) {
      return next(ERRORS.UserNotFound);
    }
    return res.success(200, personDTO.toResponse(userUpdated));
  } catch (error) {
    next(error);
  }
};

export const joinPersonToOrganization = async (req, res, next) => {
  try {
    const alreadyExists = await getPersonOrganization(
      req.body.person_id,
      req.body.organization_id
    );
    if (alreadyExists) {
      await updatePersons_Organizations(alreadyExists, {
        isActive: true,
        activity_id: req.body.activity_id,
        joinedDate: new Date(),
      });

      return res.success(200, alreadyExists);
    }

    const person_organization = CreatePersonOrganization.fromRequest(req);
    const personOrganizationCreated = await createPersons_Organizationss(
      person_organization
    );
    return res.success(201, personOrganizationCreated);
  } catch (error) {
    next(error);
  }
};

export const updateActivityFromApply = async (req, res, next) => {
  try {
    const { person_id, organization_id, activity_id } = req.body;
    const personOrganization = await getPersonOrganization(
      person_id,
      organization_id
    );
    if (!personOrganization) {
      return next(ERRORS.NotFound);
    }
    personOrganization.joinedDate = new Date();
    await updatePersons_Organizations(personOrganization, activity_id);

    return res.success(200, personOrganization);
  } catch (error) {
    next(error);
  }
};

export const deletePersonFromOrganization = async (req, res, next) => {
  try {
    const { person_id, organization_id } = req.body;
    const personOrganization = await getPersonOrganization(
      person_id,
      organization_id
    );
    if (!personOrganization) {
      return next(ERRORS.NotFound);
    }

    await deletePersons_Organizations(personOrganization);
    return res.success(200, "Eliminado correctamente");
  } catch (error) {
    next(error);
  }
};

export const getApplysByPersonId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    const { activity_id } = req.query || null;
    if (error) {
      parseValidationError(error);
    }
    const apply = await getPersons_OrganizationsByPersonId(id, activity_id);
    if (!apply) {
      return next(ERRORS.NotFound);
    }
    return res.success(200, apply);
  } catch (error) {
    next(error);
  }
};

export const getPersons_OrganizationsByOrganization = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    const { activity_id } = req.query || null;
    if (error) {
      parseValidationError(error);
    }
    const apply = await getPersons_OrganizationsByOrganizationId(
      id,
      activity_id
    );
    if (!apply) {
      return next(ERRORS.NotFound);
    }
    return res.success(
      200,
      apply.map((a) => personOrganizationDTO.toResponse(a))
    );
  } catch (error) {
    next(error);
  }
};

export const deleteUserAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const person = await getById(id);
    if (!person) {
      return next(ERRORS.UserNotFound);
    }
    await deleteUser(id);
    return res.success(200, "Usuario eliminado correctamente");
  } catch (error) {
    next(error);
  }
};

import userDTO from "../DTOS/users/userDTO.js";
import createUserDTO from "../DTOS/users/createUserDTO.js";
import {
  createUser,
  getByEmail,
  getById,
  getByUsername,
} from "../services/personService.js";

import { ERRORS } from "../utils/constants.js";
import CreatePersonOrganization from "../DTOS/users/createPersonOrganization.js";
import {
  createPersons_Organizationss,
  deletePersons_Organizations,
  getPersonOrganization,
  getPersons_OrganizationsByUserId,
  updatePersons_Organizations,
} from "../services/person_organizationService.js";

export const registerUser = async (req, res, next) => {
  const { role } = req.query;

  try {
    const newUser = createUserDTO.fromRequest(req);
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
    return res.success(201, userDTO.toResponse(userCreated));
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const person = await getById(id);
    if (!person) {
      return next(ERRORS.UserNotFound);
    }
    return res.success(200, userDTO.toResponse(person));
  } catch (error) {
    next(error);
  }
};

export const updateOneUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const person = await getById(id);
    if (!person) {
      return next(ERRORS.UserNotFound);
    }
    const userUpdated = await person.update(req.body);
    return res.success(200, userDTO.toResponse(userUpdated));
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
      await alreadyExists.update({
        isActive: true,
        activity_id: req.body.activity_id,
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
    await personOrganization.update({ activity_id });

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
    const apply = await getPersons_OrganizationsByUserId(id);
    if (!apply) {
      return next(ERRORS.NotFound);
    }
    return res.success(200, apply);
  } catch (error) {
    next(error);
  }
};

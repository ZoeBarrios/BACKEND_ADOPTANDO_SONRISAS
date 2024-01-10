import organizationsDTO from "../DTOS/organizations/organizationsDTO.js";
import organizationDTO from "../DTOS/organizations/organizationDTO.js";
import Organization from "../models/organization.js";
import {
  deleteOrganizationById,
  getActiveOrganizations,
  getOrganizationsNotIn,
  getPendingOrganizations,
  updateIsAcceptedOrganization,
  updateOrganization,
} from "../services/organizationService.js";
import {
  deletePersons_Organizations,
  getPersonOrganization,
  getPersons_OrganizationsByPersonId,
  getTotalAdminsByOrganization,
  getTotalModeratorsByOrganization,
} from "../services/person_organizationService.js";
import { ERRORS } from "../utils/errors.js";
import updateOrganizationDTO from "../DTOS/organizations/updateOrganizationDTO.js";
import personOrganizationDTO from "../DTOS/organizations/personOrganizationDTO.js";
import IdScheme from "../validationSchemes/idScheme.js";
import parseValidationError from "../utils/parseValidationError.js";

export const acceptOrganization = async (req, res, next) => {
  const organization_id = req.params.id;
  try {
    await updateIsAcceptedOrganization(organization_id);
    return res.success(204, "Organización aceptada");
  } catch (error) {
    console.error("Error al aceptar organización:", error);
    next(error);
  }
};

export const getPending = async (req, res, next) => {
  try {
    const organizations = await getPendingOrganizations();

    return res.success(
      200,
      organizations.map((o) => organizationsDTO.toResponse(o))
    );
  } catch (error) {
    console.error(error);
  }
};

export const getAdminsByOrganization = async (req, res, next) => {
  const { organization_id } = req.params;
  try {
    const users = await getTotalAdminsByOrganization(organization_id);

    return res.success(
      200,
      users.map((u) => personOrganizationDTO.toResponse(u))
    );
  } catch (error) {
    next(error);
  }
};

export const getActive = async (req, res, next) => {
  try {
    const organizations = await getActiveOrganizations();

    return res.success(
      200,
      organizations.map((o) => organizationsDTO.toResponse(o))
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getOrganization = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return next(ERRORS.NotFound);
    }
    return res.success(200, organizationDTO.toResponse(organization));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getModeratorsByOrganization = async (req, res, next) => {
  const { organization_id } = req.params;
  try {
    const users = await getTotalModeratorsByOrganization(organization_id);

    return res.success(
      200,
      users.map((u) => personOrganizationDTO.toResponse(u))
    );
  } catch (error) {
    next(error);
  }
};

export const updatOneOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const updateOrganizationdto = updateOrganizationDTO.fromRequest(req);
    const organization = await updateOrganization(id, updateOrganizationdto);
    if (!organization) {
      return next(ERRORS.NotFound);
    }

    return res.success(200, organizationDTO.toResponse(organization));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deletePersonFromOrganization = async (req, res, next) => {
  try {
    const { organization_id, person_id } = req.query;
    const organization = await getPersonOrganization(
      person_id,
      organization_id
    );
    if (!organization) {
      return next(ERRORS.NotFound);
    }
    await deletePersons_Organizations(organization);
    return res.success(204, "Persona eliminada de la organización");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getOrganizationsNotApllied = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const organizations = await getOrganizationsNotIn(id);
    return res.success(
      200,
      organizations.map((o) => organizationsDTO.toResponse(o))
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getOrganizationByPerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const organization = await getPersons_OrganizationsByPersonId(id);
    if (organization.length === 0) {
      return next(ERRORS.NoOrganizationAssigned);
    }
    return res.success(
      200,
      organization.map(({ organization }) =>
        organizationDTO.toResponse(organization)
      )
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    await deleteOrganizationById(id);
    return res.success(204, "Organización eliminada");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

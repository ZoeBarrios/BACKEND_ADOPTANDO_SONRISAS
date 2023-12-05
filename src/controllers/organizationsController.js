import organizationsDTO from "../DTOS/organizations/organizationsDTO.js";
import organizationDTO from "../DTOS/organizations/organizationDTO.js";
import Organization from "../models/Organization.js";
import {
  getActiveOrganizations,
  getPendingOrganizations,
  updateIsAcceptedOrganization,
} from "../services/organizationService.js";
import {
  getTotalAdminsByOrganization,
  getTotalModeratorsByOrganization,
} from "../services/users_organizationsService.js";
import { ERRORS } from "../utils/constants.js";

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

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getActive = async (req, res, next) => {
  try {
    const organizations = await getActiveOrganizations();
    return res
      .status(200)
      .json(organizations.map((o) => organizationsDTO.toResponse(o)));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getOrganization = async (req, res, next) => {
  const { id } = req.params;
  try {
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

    return res.success(200, users);
  } catch (error) {
    next(error);
  }
};

export const updatOneOrganization = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, email, phone, instagram_link, facebook_link } =
    req.body;
  try {
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return next(ERRORS.NotFound);
    }
    await organization.update({
      name,
      description,
      email,
      phone,
      instagram_link,
      facebook_link,
    });

    return res.success(200, organizationDTO.toResponse(organization));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

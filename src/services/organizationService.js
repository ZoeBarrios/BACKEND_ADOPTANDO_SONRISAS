import Organization from "../models/organization.js";
import { Op } from "sequelize";
import { getPersons_OrganizationsByUserId } from "./person_organizationService.js";
export const createOrganization = async (organization) => {
  try {
    return await Organization.create(organization);
  } catch (error) {
    throw error;
  }
};

export const updateIsAcceptedOrganization = async (organizationId) => {
  try {
    const organization = await Organization.findByPk(organizationId);
    if (!organization) {
      return null;
    }

    organization.isAccepted = true;
    return await organization.save();
  } catch (error) {
    throw error;
  }
};

export const deleteOrganization = async (organizationId) => {
  try {
    const organization = await Organization.findByPk(organizationId);
    organization.isEliminated = true;
    return await organization.save();
  } catch (error) {
    throw error;
  }
};

export const getActiveOrganizations = async () => {
  try {
    return await Organization.findAll({
      where: {
        isAccepted: true,
        isEliminated: false,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getPendingOrganizations = async () => {
  try {
    return await Organization.findAll({
      where: {
        isAccepted: false,
        isEliminated: false,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getOrganizationsNotIn = async (personId) => {
  const applys = await getPersons_OrganizationsByUserId(personId);
  const organizationsId = applys.map((apply) => apply.organization_id);

  try {
    return await Organization.findAll({
      where: {
        organization_id: {
          [Op.notIn]: organizationsId,
        },
        isAccepted: true,
        isEliminated: false,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getOrganizationById = async (organizationId) => {
  try {
    return await Organization.findByPk(organizationId);
  } catch (error) {
    throw error;
  }
};

export const updateOrganization = async (organizationId, organization) => {
  try {
    const organizationToUpdate = await Organization.findByPk(organizationId);
    if (!organizationToUpdate) {
      return null;
    }
    return await organizationToUpdate.update(organization);
  } catch (error) {
    throw error;
  }
};

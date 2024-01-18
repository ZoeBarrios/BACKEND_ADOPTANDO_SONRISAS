import Organization from "../models/organization.js";
import { Op } from "sequelize";
import { sequelize } from "../config/db.js";
import {
  getPersons_OrganizationsByPersonId,
  deletePersonsFromOrganizationsByOrganizationId,
} from "./person_organizationService.js";
import { deleteAnimalsByOrganization } from "./animalsService.js";
import { deleteCaseByOrganizationId } from "./casesService.js";
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
    organization.isDeleted = true;
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
        isDeleted: false,
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
        isDeleted: false,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getOrganizationsNotIn = async (personId) => {
  const applys = await getPersons_OrganizationsByPersonId(personId);
  const organizationsId = applys.map((apply) => apply.organization_id);

  try {
    return await Organization.findAll({
      where: {
        organization_id: {
          [Op.notIn]: organizationsId,
        },
        isAccepted: true,
        isDeleted: false,
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

export const deleteOrganizationById = async (organizationId) => {
  const t = await sequelize.transaction();

  try {
    const organization = await Organization.findByPk(organizationId, {
      transaction: t,
    });
    if (!organization) {
      return null;
    }

    await organization.update(
      { isDeleted: true, isAccepted: false },
      { transaction: t }
    );
    await deleteAnimalsByOrganization(organizationId, t);
    await deleteCaseByOrganizationId(organizationId, t);
    await deletePersonsFromOrganizationsByOrganizationId(organizationId, t);

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

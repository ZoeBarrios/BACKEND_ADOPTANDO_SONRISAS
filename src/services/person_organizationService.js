import Role from "../models/Role.js";
import Organization from "../models/organization.js";
import Person from "../models/person.js";
import person from "../models/person.js";
import Persons_Organizations from "../models/persons_organizations.js";
import { ROLES } from "../utils/constants.js";

export const createPersons_Organizationss = async (Persons_Organizationss) => {
  try {
    return await Persons_Organizations.create(Persons_Organizationss);
  } catch (error) {
    throw error;
  }
};

export const getPersonOrganization = async (personId, organizationId) => {
  try {
    return await Persons_Organizations.findOne({
      where: {
        person_id: personId,
        organization_id: organizationId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getPersons_OrganizationsByUserId = async (person_id) => {
  try {
    return await Persons_Organizations.findAll({
      where: { person_id: person_id, isActive: true },
      include: [
        {
          model: Organization,
          where: { isAccepted: true, isEliminated: false },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};
export const getPersons_OrganizationsByOrganizationId = async (
  organizationId
) => {
  try {
    return await Persons_Organizations.findAll({
      where: { organization_id: organizationId },
      include: [{ model: Person, where: { role_id: ROLES.USER } }],
    });
  } catch (error) {
    throw error;
  }
};
export const getTotalAdminsByOrganization = async (organizationId) => {
  try {
    const role = await Role.findOne({ where: { role_name: ROLES.ADMIN } });
    return await Persons_Organizations.findAll({
      where: {
        organization_id: organizationId,
      },
      include: [{ model: person, where: { role_id: role.role_id } }],
    });
  } catch (error) {
    throw error;
  }
};

export const getTotalModeratorsByOrganization = async (organizationId) => {
  try {
    const role = await Role.findOne({ where: { role_name: ROLES.MODERATOR } });
    return await Persons_Organizations.findAll({
      where: {
        organization_id: organizationId,
      },
      include: [{ model: Person, where: { role_id: role.id } }],
    });
  } catch (error) {
    throw error;
  }
};

export const updatePersons_Organizations = async (Persons_Organizationss) => {
  try {
    return await Persons_Organizations.update(Persons_Organizationss, {
      where: {
        person_id: Persons_Organizationss.person_id,
        organization_id: Persons_Organizationss.organization_id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deletePersons_Organizations = async (person_organization) => {
  try {
    return await person_organization.update({ isActive: false });
  } catch (error) {
    throw error;
  }
};

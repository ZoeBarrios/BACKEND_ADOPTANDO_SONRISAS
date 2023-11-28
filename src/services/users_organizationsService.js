import Role from "../models/Role.js";
import User from "../models/user.js";
import User_Organization from "../models/users_organization.js";
import { ROLES } from "../utils/constants.js";

export const createUsers_organizations = async (users_organizations) => {
  try {
    return await User_Organization.create(users_organizations);
  } catch (error) {
    throw error;
  }
};

export const getTotalAdminsByOrganization = async (organizationId) => {
  try {
    const role = await Role.findOne({ where: { role_name: ROLES.ADMIN } });
    return await User_Organization.findAll({
      where: {
        organization_id: organizationId,
      },
      include: [{ model: User, where: { role_id: role.id } }],
    });
  } catch (error) {
    throw error;
  }
};

export const getTotalModeratorsByOrganization = async (organizationId) => {
  try {
    const role = await Role.findOne({ where: { role_name: ROLES.MODERATOR } });
    return await User_Organization.findAll({
      where: {
        organization_id: organizationId,
      },
      include: [{ model: User, where: { role_id: role.id } }],
    });
  } catch (error) {
    throw error;
  }
};

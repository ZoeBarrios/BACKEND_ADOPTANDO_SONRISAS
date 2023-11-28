import Organization from "../models/organization.js";
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
      throw new Error("Organización no encontrada");
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

export const getOrganizationById = async (organizationId) => {
  try {
    return await Organization.findByPk(organizationId);
  } catch (error) {
    throw error;
  }
};

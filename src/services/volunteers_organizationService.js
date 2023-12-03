import Organization from "../models/organization.js";
import Volunteer_Organization from "../models/volunteers_organization.js";
export const createVolunteer_Organization = async (volunteer_organization) => {
  try {
    const newVolunteer_Organization = await Volunteer_Organization.create(
      volunteer_organization
    );
    return newVolunteer_Organization;
  } catch (error) {
    console.error("Error al crear voluntario:", error);
    throw new Error(error);
  }
};

export const getOrganizationByVolunteer = async (volunteer_id) => {
  try {
    const organizations = await Volunteer_Organization.findAll({
      where: {
        user_id: volunteer_id,
      },
      include: {
        model: Organization,
      },
    });
    return organizations;
  } catch (error) {
    console.error("Error al obtener organizaciones por voluntario:", error);
    throw new Error(error);
  }
};

export const deleteByOrganizationAndVolunterId = async (
  organization_id,
  volunteer_id
) => {
  try {
    await Volunteer_Organization.destroy({
      where: {
        organization_id: organization_id,
        user_id: volunteer_id,
      },
    });
  } catch (error) {
    console.error("Error al eliminar voluntario:", error);
    throw new Error(error);
  }
};

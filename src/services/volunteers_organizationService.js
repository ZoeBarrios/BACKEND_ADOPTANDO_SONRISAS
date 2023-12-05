import Organization from "../models/organization.js";
import Volunteer_Organization from "../models/volunteers_organization.js";

import { getById } from "./userService.js";
export const createVolunteer_Organization = async (volunteer_organization) => {
  try {
    const newVolunteer_Organization = await Volunteer_Organization.create(
      volunteer_organization
    );
    const volunteerOrganizationCreated = await Volunteer_Organization.findOne({
      where: {
        organization_id: volunteer_organization.organization_id,
        user_id: volunteer_organization.user_id,
        activity: volunteer_organization.activity,
      },
      include: [
        {
          model: Organization,
        },
      ],
    });
    return volunteerOrganizationCreated;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllByVolunteerId = async (id) => {
  try {
    const user = await getById(id);

    const organizations = await Volunteer_Organization.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Organization,
          as: "organization",
        },
      ],
    });

    return organizations;
  } catch (error) {
    console.error(error);
    throw error;
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
    console.error(error);
    throw error;
  }
};

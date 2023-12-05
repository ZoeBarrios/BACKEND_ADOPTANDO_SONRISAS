import VolunteerOrganizationDTO from "../DTOS/volunteers/volunteerOrganizationDTO.js";
import { getOrganizationById } from "../services/organizationService.js";
import { getById } from "../services/userService.js";
import {
  createVolunteer_Organization,
  deleteByOrganizationAndVolunterId,
  getAllByVolunteerId,
} from "../services/volunteers_organizationService.js";
import { ERRORS } from "../utils/constants.js";

export const getAllOrganizationsByVolunteer = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getById(id);

    if (!user) {
      return next(ERRORS.UserNotFound);
    }
    const organizations = await getAllByVolunteerId(id);

    return res.success(
      200,
      organizations.map((organization) =>
        VolunteerOrganizationDTO.toResponse(organization)
      )
    );
  } catch (error) {
    next(error);
  }
};

export const deleteOrganizationFromVolunteers = async (req, res, next) => {
  const { organization_id, volunteer_id } = req.body;
  try {
    await deleteByOrganizationAndVolunterId(organization_id, volunteer_id);
    return res.success(204, "Voluntariado eliminado");
  } catch (error) {
    next(error);
  }
};

export const creatOrganizationVolunteer = async (req, res, next) => {
  const { organization_id, user_id, activity } = req.body;

  try {
    const user = await getById(user_id);
    if (!user) {
      return next(ERRORS.UserNotFound);
    }

    const organization = await getOrganizationById(organization_id);
    if (!organization) {
      return next(ERRORS.NotFound);
    }
    const volunteer_organization = await createVolunteer_Organization({
      organization_id,
      user_id,
      activity,
    });
    return res.success(
      201,

      VolunteerOrganizationDTO.toResponse(volunteer_organization)
    );
  } catch (error) {
    next(error);
  }
};

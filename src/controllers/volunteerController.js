import organizationsDTO from "../DTOS/organizations/organizationsDTO.js";
import {
  deleteByOrganizationAndVolunterId,
  getOrganizationByVolunteer,
} from "../services/volunteers_organizationService.js";

export const getOrganizationByVolunteerId = async (req, res) => {
  const { id } = req.params;
  try {
    const organizations = await getOrganizationByVolunteer(id);
    return res
      .status(200)
      .json(organizations.map((o) => organizationsDTO.toResponse(o)));
  } catch (error) {
    console.error("Error al obtener organizaciones por voluntario:", error);
    return res.status(400).json({ message: "Error en la petición" });
  }
};

export const deleteOrganizationFromVolunteers = async (req, res) => {
  const { organization_id, volunteer_id } = req.body;
  try {
    await deleteByOrganizationAndVolunterId(organization_id, volunteer_id);
    return res.status(200).json({ message: "Organización eliminada" });
  } catch (error) {
    console.error("Error al eliminar organización:", error);
    return res.status(400).json({ message: "Error en la petición" });
  }
};

import organizationsDTO from "../DTOS/organizations/organizationsDTO.js";
import organizationDTO from "../DTOS/organizations/organizationDTO.js";
import Organization from "../models/Organization.js";
import {
  getActiveOrganizations,
  getPendingOrganizations,
  updateIsAcceptedOrganization,
} from "../services/organizationService.js";

export const acceptOrganization = async (req, res) => {
  const organization_id = req.params.id;
  try {
    await updateIsAcceptedOrganization(organization_id);
    return res.status(200).json({ message: "Organización aceptada" });
  } catch (error) {
    console.error("Error al aceptar organización:", error);
    return res.status(400).json({ message: "Error en la petición" });
  }
};

export const getPending = async (req, res) => {
  try {
    const organizations = await getPendingOrganizations();
    return res
      .status(200)
      .json(organizations.map((o) => organizationsDTO.toResponse(o)));
  } catch (error) {
    console.error("Error al obtener organizaciones pendientes:", error);
    return res.status(400).json({ message: "Error en la petición" });
  }
};

export const getActive = async (req, res) => {
  try {
    const organizations = await getActiveOrganizations();
    return res
      .status(200)
      .json(organizations.map((o) => organizationsDTO.toResponse(o)));
  } catch (error) {
    console.error("Error al obtener organizaciones activas:", error);
    return res.status(400).json({ message: "Error en la petición" });
  }
};

export const getOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return res.status(400).json({ message: "Organización no encontrada" });
    }
    return res.status(200).json(organizationDTO.toResponse(organization));
  } catch (error) {
    console.error("Error al obtener organización:", error);
    return res.status(400).json({ message: "Error en la petición" });
  }
};

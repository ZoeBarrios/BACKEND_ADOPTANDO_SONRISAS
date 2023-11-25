import adoptionDTO from "../DTOS/adoptions/adoptionDTO.js";
import createAdoptionDTO from "../DTOS/adoptions/createAdoptionDTO.js";
import {
  createAdoption,
  getAdoption,
  getAdoptions,
  getAllAdoptionsByMonth,
  getAllAdoptionsByYear,
} from "../services/adoptionsService.js";

export const registerAdoption = async (req, res) => {
  const adoptionCreatedDto = createAdoptionDTO.fromRequest(req);
  try {
    const adoption = await createAdoption(adoptionCreatedDto);
    res.status(201).json(adoptionDTO.toResponse(adoption));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllAdoptions = async (req, res) => {
  const { organizationId } = req.params;
  try {
    const adoptions = await getAdoptions(organizationId);
    res
      .status(200)
      .json(adoptions.map((adoption) => adoptionDTO.toResponse(adoption)));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getOneAdoption = async (req, res) => {
  const { organizationId, animalId } = req.params;
  try {
    const adoption = await getAdoption(animalId, organizationId);
    res.status(200).json(adoptionDTO.toResponse(adoption));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAdoptionsByMonth = async (req, res) => {
  const { organizationId, num_month } = req.params;

  try {
    const adoptions = await getAllAdoptionsByMonth(organizationId, num_month);
    res.status(200).json(adoptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAdoptionsByYear = async (req, res) => {
  const { organizationId, year } = req.params;
  try {
    const adoptions = await getAllAdoptionsByYear(organizationId, year);
    res.status(200).json(adoptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

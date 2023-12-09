import adoptionDTO from "../DTOS/adoptions/adoptionDTO.js";
import createAdoptionDTO from "../DTOS/adoptions/createAdoptionDTO.js";
import {
  createAdoption,
  getAdoption,
  getAdoptions,
  getAllAdoptionsByMonth,
  getAllAdoptionsByYear,
} from "../services/adoptionsService.js";
import { setAnimalAdopted } from "../services/animalsService.js";

export const registerAdoption = async (req, res, next) => {
  const adoptionCreatedDto = createAdoptionDTO.fromRequest(req);
  try {
    const adoption = await createAdoption(adoptionCreatedDto);
    await setAnimalAdopted(adoptionCreatedDto.animalId);
    res.success(201, adoptionDTO.toResponse(adoption));
  } catch (err) {
    next(err);
  }
};

export const getAllAdoptions = async (req, res, next) => {
  const { organizationId } = req.params;
  try {
    const adoptions = await getAdoptions(organizationId);
    return res.success(
      200,
      adoptions.map((adoption) => adoptionDTO.toResponse(adoption))
    );
  } catch (err) {
    next(err);
  }
};

export const getOneAdoption = async (req, res, next) => {
  const { organizationId, animalId } = req.params;
  try {
    const adoption = await getAdoption(animalId, organizationId);
    return res.success(200, adoptionDTO.toResponse(adoption));
  } catch (err) {
    next(err);
  }
};

export const getAdoptionsByMonth = async (req, res, next) => {
  const { organizationId, num_month } = req.params;

  try {
    const adoptions = await getAllAdoptionsByMonth(organizationId, num_month);
    return res.success(200, adoptions);
  } catch (err) {
    next(err);
  }
};

export const getAdoptionsByYear = async (req, res, next) => {
  const { organizationId, year } = req.params;
  try {
    const adoptions = await getAllAdoptionsByYear(organizationId, year);
    return res.success(200, adoptions);
  } catch (err) {
    next(err);
  }
};

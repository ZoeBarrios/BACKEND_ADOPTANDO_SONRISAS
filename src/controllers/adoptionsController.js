import adoptionDTO from "../DTOS/adoptions/adoptionDTO.js";
import createAdoptionDTO from "../DTOS/adoptions/createAdoptionDTO.js";
import adoptionsDTO from "../DTOS/adoptions/adoptionsDTO.js";
import {
  createAdoption,
  getAdoption,
  getAdoptions,
  getAllADoptionByOrganizationId,
  getAllAdoptionsByUserId,
} from "../services/adoptionsService.js";
import { setAnimalAdopted } from "../services/animalsService.js";
import { ERRORS } from "../utils/constants.js";

export const registerAdoption = async (req, res, next) => {
  try {
    const adoptionCreatedDto = createAdoptionDTO.fromRequest(req);
    const adoptionExist = await getAdoption(
      adoptionCreatedDto.animal_id,
      adoptionCreatedDto.person_id
    );
    if (adoptionExist) {
      return next(ERRORS.AdoptionAlreadyExists);
    }
    const adoption = await createAdoption(adoptionCreatedDto);

    const adoptionToReturn = await getAdoption(
      adoption.animal_id,
      adoption.person_id
    );

    res.success(201, adoptionDTO.toResponse(adoptionToReturn));
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
      adoptions.map((adoption) => adoptionsDTO.toResponse(adoption))
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

export const getAdoptionsByUserId = async (req, res, next) => {
  try {
    const { personId } = req.params;
    console.log(personId);
    const adoptions = await getAllAdoptionsByUserId(personId);
    return res.success(
      200,
      adoptions.map((adoption) => adoptionsDTO.toResponse(adoption))
    );
  } catch (err) {
    next(err);
  }
};

export const getAdoptionsByOrganizationId = async (req, res, next) => {
  try {
    const { organizationId } = req.params;
    const adoptions = await getAllADoptionByOrganizationId(organizationId);
    return res.success(
      200,
      adoptions.map((adoption) => adoptionsDTO.toResponse(adoption))
    );
  } catch (err) {
    next(err);
  }
};

export const accept = async (req, res, next) => {
  try {
    const { userId, animalId } = req.params;
    const adoption = await getAdoption(animalId, userId);
    adoption.isAccepted = true;
    await adoption.save();
    await setAnimalAdopted(animalId);
    return res.success(200, adoptionDTO.toResponse(adoption));
  } catch (err) {
    next(err);
  }
};

export const cancel = async (req, res, next) => {
  try {
    const { person_id, animal_id } = req.body;
    const adoption = await getAdoption(animal_id, person_id);
    adoption.isCancelled = true;
    await adoption.save();
    return res.success(200, adoptionDTO.toResponse(adoption));
  } catch (err) {
    next(err);
  }
};

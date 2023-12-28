import adoptionDTO from "../DTOS/adoptions/adoptionDTO.js";
import createAdoptionDTO from "../DTOS/adoptions/createAdoptionDTO.js";
import adoptionsDTO from "../DTOS/adoptions/adoptionsDTO.js";
import {
  acceptAdoption,
  createAdoption,
  getAdoption,
  getAllAdoptionByOrganizationId,
  getAllAdoptionsByUserId,
} from "../services/adoptionsService.js";
import { setAnimalAdopted } from "../services/animalsService.js";
import { ERRORS } from "../utils/errors.js";
import { send } from "../services/emailService.js";
import { createPDF } from "../services/pdfService.js";
import { getOrganizationById } from "../services/organizationService.js";
import { config } from "dotenv";

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

    const organization = await getOrganizationById(
      adoptionToReturn.animal.organization_id
    );

    const infoPDF = await createPDF({
      ...adoptionToReturn,
      organization: organization,
    });

    const email = process.env.EMAIL;

    await send(
      {
        to: adoptionToReturn.person.email,
        subject: "Información de la adopción",
        text: "Tu petición de adopción ha sido registrada, pronto recibirás una respuesta de la organización.",
      },
      email,
      infoPDF
    );

    res.success(201, adoptionDTO.toResponse(adoptionToReturn));
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
    const { isCancelled, isAccepted } = req.query ?? {};
    const adoptions = await getAllAdoptionsByUserId(
      personId,
      isAccepted,
      isCancelled
    );
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
    const { isCancelled, isAccepted } = req.query ?? {};
    const adoptions = await getAllAdoptionByOrganizationId(
      organizationId,
      isAccepted,
      isCancelled
    );
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
    const { person_id, animal_id } = req.body;
    const adoption = await acceptAdoption(animal_id, person_id);
    await setAnimalAdopted(animal_id);
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

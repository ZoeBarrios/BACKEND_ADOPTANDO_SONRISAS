import createAnimalDTO from "../DTOS/animals/createAnimalDTO.js";
import animalsDTO from "../DTOS/animals/animalsDTO.js";
import animalDTO from "../DTOS/animals/animalDTO.js";
import {
  createAnimal,
  deleteAnimal,
  getAnimalById,
  getAnimals,
  getAnimalsByOrganization,
  getFilteredAnimal,
  updateAnimal,
} from "../services/animalsService.js";
import { uploadSingleImage } from "../services/imgService.js";
import { ERRORS } from "../utils/errors.js";
import IdScheme from "../validationSchemes/idScheme.js";
import parseValidationError from "../utils/parseValidationError.js";

export const registerAnimal = async (req, res, next) => {
  try {
    if (!req.file) return next(ERRORS.NoImageSend);
    req.body.img = await uploadSingleImage(req.file);
    const animal = createAnimalDTO.fromRequest(req);
    await createAnimal(animal);
    return res.success(201, "Animal registrado");
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  const page = req.query.page || 1;

  try {
    const animals = await getAnimals(page);

    return res.success(200, animalsDTO.toResponse(animals));
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const animal = await getAnimalById(id);
    if (!animal) return next(ERRORS.NotFound);

    return res.success(200, animalDTO.toResponse(animal));
  } catch (error) {
    next(error);
  }
};

export const getFiltered = async (req, res, next) => {
  const { genre, age, size, type } = req.query;
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;

  try {
    const animals = await getFilteredAnimal(
      genre,
      age,
      size,
      type,
      page,
      limit
    );
    return res.success(200, animalsDTO.toResponse(animals));
  } catch (error) {
    next(error);
  }
};

export const getAnimalsByOrganizationId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = req.query.page || 1;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const animals = await getAnimalsByOrganizationId(id, page);
    return res.success(200, animalsDTO.toResponse(animals));
  } catch (error) {
    next(error);
  }
};

export const deleteAnimalById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    await deleteAnimal(id);
    return res.success(204, "Animal eliminado");
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    let obj = {};
    if (req.file) {
      obj.img_url = await uploadSingleImage(req.file);
    }
    if (name) {
      obj.name = name;
    }
    if (description) {
      obj.description = description;
    }
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const animalUpdated = await updateAnimal(id, obj);
    console.log(animalUpdated);
    return res.success(200, "Animal actualizado");
  } catch (error) {
    next(error);
  }
};

export const getAnimalByOrganizationId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    const { name, isDeleted } = req.query ?? {};
    if (error) {
      parseValidationError(error);
    }
    const animal = await getAnimalsByOrganization(id, isDeleted, name);
    console.log(animal);
    return res.success(200, animalsDTO.toResponse(animal));
  } catch (error) {
    next(error);
  }
};

import createAnimalDTO from "../DTOS/animals/createAnimalDTO.js";
import animalsDTO from "../DTOS/animals/animalsDTO.js";
import animalDTO from "../DTOS/animals/animalDTO.js";
import {
  createAnimal,
  deleteAnimal,
  getAllAnimalAdmin,
  getAnimalById,
  getAnimals,
  getFilteredAnimal,
  updateAnimal,
} from "../services/animalsService.js";
import { uploadSingleImage } from "../services/imgService.js";
import { ERRORS } from "../utils/constants.js";

export const registerAnimal = async (req, res, next) => {
  if (!req.file) return next(ERRORS.NoImageSend);
  req.body.img = await uploadSingleImage(req.file);
  const animal = createAnimalDTO.fromRequest(req);
  try {
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
  const { id } = req.params;

  try {
    const animal = await getAnimalById(id);
    if (!animal) return next(ERRORS.NotFound);

    return res.success(200, animalDTO.toResponse(animal));
  } catch (error) {
    next(error);
  }
};

export const getFiltered = async (req, res, next) => {
  const { genre, age, size } = req.query;
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;

  try {
    const animals = await getFilteredAnimal(genre, age, size, page, limit);
    return res.success(200, animalsDTO.toResponse(animals));
  } catch (error) {
    next(error);
  }
};

export const getAnimalsByOrganizationId = async (req, res, next) => {
  const { id } = req.params;
  const page = req.query.page || 1;
  try {
    const animals = await getAnimalsByOrganizationId(id, page);
    return res.success(200, animalsDTO.toResponse(animals));
  } catch (error) {
    next(error);
  }
};

export const getAllAdmin = async (req, res, next) => {
  const page = req.query.page || 1;
  try {
    const animals = await getAllAnimalAdmin(page);
    return res.success(200, animalsDTO.toResponse(animals));
  } catch (error) {
    next(error);
  }
};

export const deleteAnimalById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteAnimal(id);
    return res.success(204, "Animal eliminado");
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
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

  try {
    const animalUpdated = await updateAnimal(id, obj);
    console.log(animalUpdated);
    return res.success(200, "Animal actualizado");
  } catch (error) {
    next(error);
  }
};

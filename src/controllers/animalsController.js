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

export const registerAnimal = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No se ha enviado ninguna imagen" });
  req.body.img = await uploadSingleImage(req.file);
  const animal = createAnimalDTO.fromRequest(req);
  try {
    await createAnimal(animal);
    return res.status(201).json({ message: "Animal registrado" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  const page = req.query.page || 1;

  try {
    const animals = await getAnimals(page);

    return res.status(200).json(animalsDTO.toResponse(animals));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const animal = await getAnimalById(id);
    if (!animal)
      return res.status(404).json({ message: "Animal no encontrado" });

    return res.status(200).json(animalDTO.toResponse(animal));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getFiltered = async (req, res) => {
  const { genre, maxDays, size } = req.query;

  try {
    const animals = await getFilteredAnimal(genre, maxDays, size);
    return res.status(200).json(animalsDTO.toResponse(animals));
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const getAllAdmin = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const animals = await getAllAnimalAdmin(page);
    return res.status(200).json(animalsDTO.toResponse(animals));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteAnimalById = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAnimal(id);
    return res.status(200).json({ message: "Animal eliminado" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const update = async (req, res) => {
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
    return res.status(200).json(animalDTO.toResponse(animalUpdated));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

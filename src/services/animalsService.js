import Animal from "../models/animals.js";
import { literal, Op } from "sequelize";

export const createAnimal = async (animal) => {
  const animalCreated = await Animal.create(animal);
  return animalCreated;
};

export const getAnimals = async (page) => {
  const limit = 12;
  const offset = limit * (page - 1);

  try {
    const animals = await Animal.findAll({
      offset,
      limit,
    });
    return animals;
  } catch (error) {
    throw new Error(`Error al obtener animales: ${error.message}`);
  }
};

export const getAnimalsByGenre = async (page, sex) => {
  const limit = 12;
  const offset = limit * (page - 1);

  try {
    const animals = await Animal.findAll({
      where: {
        sex: sex.toUpperCase(),
      },
      offset,
      limit,
    });
    return animals;
  } catch (error) {
    throw new Error(`Error al obtener animales: ${error.message}`);
  }
};

export const getAnimalById = async (id) => {
  try {
    const animal = await Animal.findByPk(id);
    return animal;
  } catch (error) {
    throw new Error(`Error al obtener animal: ${error.message}`);
  }
};

export const getAnimalsByAgeRange = async (minDays, maxDays, page) => {
  const limit = 12;
  const offset = limit * (page - 1);

  try {
    const animals = await Animal.findAll({
      where: {
        birthdate: {
          [Op.lt]: literal(`CURRENT_DATE - INTERVAL '${minDays} DAY'`),
          [Op.gt]: literal(`CURRENT_DATE - INTERVAL '${maxDays} DAY'`),
        },
      },
      offset,
      limit,
    });

    return animals;
  } catch (error) {
    throw new Error(
      `Error al obtener animales por rango de edad: ${error.message}`
    );
  }
};

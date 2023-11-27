import Animal from "../models/animals.js";
import { literal, Op } from "sequelize";
import Organization from "../models/organization.js";

export const createAnimal = async (animal) => {
  const animalCreated = await Animal.create(animal);
  return animalCreated;
};

export const getAnimals = async (page) => {
  const limit = 12;
  const offset = limit * (page - 1);

  try {
    const animals = await Animal.findAll({
      where: {
        adopted: false,
        eliminated: false,
      },
      offset,
      limit,
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["name"],
        },
      ],
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
        adopted: false,
        eliminated: false,
      },
      offset,
      limit,
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["name"],
        },
      ],
    });
    return animals;
  } catch (error) {
    throw new Error(`Error al obtener animales: ${error.message}`);
  }
};

export const getAnimalById = async (id) => {
  try {
    const animal = await Animal.findByPk(id, {
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["name"],
        },
      ],
    });
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
        adopted: false,
        eliminated: false,
      },
      offset,
      limit,
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["name"],
        },
      ],
    });

    return animals;
  } catch (error) {
    throw new Error(
      `Error al obtener animales por rango de edad: ${error.message}`
    );
  }
};

export const getAllAnimalAdmin = async (page) => {
  const limit = 12;
  const offset = limit * (page - 1);

  try {
    const animals = await Animal.findAll({
      offset,
      limit,
      where: {
        eliminated: false,
      },
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["name"],
        },
      ],
    });
    return animals;
  } catch (error) {
    throw new Error(`Error al obtener animales: ${error.message}`);
  }
};

export const setAnimalAdopted = async (id) => {
  try {
    const animal = await Animal.findByPk(id);
    animal.adopted = true;
    await animal.save();
  } catch (error) {
    throw new Error(`Error al actualizar animal: ${error.message}`);
  }
};

export const deleteAnimal = async (id) => {
  try {
    const animal = await Animal.findByPk(id);
    if (!animal) throw new Error(`No existe el animal con id ${id}`);
    animal.eliminated = true;
    await animal.save();
  } catch (error) {
    throw new Error(`Error al eliminar animal: ${error.message}`);
  }
};

export const updateAnimal = async (id, animal) => {
  try {
    const animalUpdated = await Animal.update(animal, {
      where: {
        id,
      },
      returning: true,
    });
    if (animalUpdated[1].length > 0) {
      const updatedAnimal = animalUpdated[1][0];
      return updatedAnimal;
    } else {
      throw new Error("No se pudo encontrar el animal actualizado");
    }
  } catch (error) {
    throw new Error(`Error al actualizar animal: ${error.message}`);
  }
};

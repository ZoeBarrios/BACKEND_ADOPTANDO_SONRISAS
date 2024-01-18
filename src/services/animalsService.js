import Animal from "../models/animal.js";
import { Op } from "sequelize";
import Organization from "../models/organization.js";
import { AGE } from "../utils/constants.js";
import { cancelAllAdoptionsByAnimal } from "./adoptionsService.js";

export const createAnimal = async (animal) => {
  const animalCreated = await Animal.create(animal);
  return animalCreated;
};

export const getAnimalsByOrganization = async (
  organizationId,
  isDeleted,
  name
) => {
  let where = {
    organization_id: organizationId,
  };

  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }
  if (isDeleted) {
    where.isDeleted = isDeleted;
  }
  try {
    const animals = await Animal.findAll({
      where: where,
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
    throw error;
  }
};

export const getAnimals = async (page) => {
  const limit = 12;
  const offset = limit * (page - 1);

  try {
    const animals = await Animal.findAll({
      where: {
        adopted: false,
        isDeleted: false,
      },
      offset,
      limit,
      include: [
        {
          model: Organization,
          attributes: ["name"],
        },
      ],
    });
    return animals;
  } catch (error) {
    throw error;
  }
};

export const getAnimalById = async (id) => {
  try {
    const animal = await Animal.findByPk(id, {
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["organization_id", "name"],
        },
      ],
    });
    return animal;
  } catch (error) {
    throw error;
  }
};

export const getFilteredAnimal = async (
  genre = null,
  age = null,
  size = null,
  type = null,
  page = 1,
  limit = 12
) => {
  const offset = (page - 1) * limit;

  let where = {
    adopted: false,
    isDeleted: false,
  };

  if (genre) {
    where.sex = genre.toUpperCase();
  }

  if (type) {
    where.type = type.toUpperCase();
  }

  if (age) {
    const currentDate = new Date();

    if (age === AGE.PUPPY) {
      const oneYearAgo = new Date(currentDate);
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      where.birthdate = {
        [Op.gte]: oneYearAgo,
      };
    }

    if (age === AGE.ADULT) {
      const nineYearsAgo = new Date(currentDate);
      nineYearsAgo.setFullYear(nineYearsAgo.getFullYear() - 9);
      const oneYearAgo = new Date(currentDate);
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      where.birthdate = {
        [Op.between]: [nineYearsAgo, oneYearAgo],
      };
    }

    if (age === AGE.OLD) {
      const nineYearsAgo = new Date(currentDate);
      nineYearsAgo.setFullYear(nineYearsAgo.getFullYear() - 9);
      where.birthdate = {
        [Op.lt]: nineYearsAgo,
      };
    }
  }

  if (size) {
    where.size = size.toUpperCase();
  }

  try {
    const animals = await Animal.findAll({
      where,
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["organization_id", "name"],
        },
      ],
      offset,
      limit: limit,
    });
    return animals;
  } catch (error) {
    throw error;
  }
};

export const setAnimalAdopted = async (id) => {
  try {
    const animal = await Animal.findByPk(id);
    animal.adopted = true;
    await animal.save();
  } catch (error) {
    throw error;
  }
};

export const deleteAnimal = async (id) => {
  try {
    const animal = await Animal.findByPk(id);
    if (!animal) throw new Error(`No existe el animal con id ${id}`);
    await updateAnimal(id, { isDeleted: true });
    await cancelAllAdoptionsByAnimal(id);
  } catch (error) {
    throw error;
  }
};

export const updateAnimal = async (animal_id, animal) => {
  try {
    const animalUpdated = await Animal.update(animal, {
      where: {
        animal_id,
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
    throw error;
  }
};

export const deleteAnimalsByOrganization = async (organizationId) => {
  try {
    await Animal.update(
      { isDeleted: true },
      {
        where: {
          organization_id: organizationId,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

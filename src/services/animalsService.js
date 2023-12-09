import Animal from "../models/animals.js";
import { literal, Op } from "sequelize";
import Organization from "../models/organization.js";
import { AGE } from "../utils/constants.js";

export const createAnimal = async (animal) => {
  const animalCreated = await Animal.create(animal);
  return animalCreated;
};

export const getAnimalsByOrganization = async (organizationId, page) => {
  try {
    const animals = await Animal.findAll({
      where: {
        organization_id: organizationId,
      },
      offset: page,
      limit: 12,
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
          attributes: ["name"],
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
  page = 1
) => {
  const limitPerPage = 12;
  const offset = (page - 1) * limitPerPage;

  let where = {
    adopted: false,
    eliminated: false,
  };

  if (genre) {
    where.sex = genre.toUpperCase();
  }

  if (age) {
    const currentDate = new Date();

    if (age === AGE.CACHORRO) {
      const oneYearAgo = new Date(currentDate);
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      where.birthdate = {
        [Op.gte]: oneYearAgo,
      };
    }

    if (age === AGE.ADULTO) {
      const nineYearsAgo = new Date(currentDate);
      nineYearsAgo.setFullYear(nineYearsAgo.getFullYear() - 9);
      const oneYearAgo = new Date(currentDate);
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      where.birthdate = {
        [Op.between]: [nineYearsAgo, oneYearAgo],
      };
    }

    if (age === AGE.ANCIANO) {
      const nineYearsAgo = new Date(currentDate);
      nineYearsAgo.setFullYear(nineYearsAgo.getFullYear() - 9);
      where.birthdate = {
        [Op.lt]: nineYearsAgo,
      };
    }
  }
  console.log(where);

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
          attributes: ["name"],
        },
      ],
      offset,
      limit: limitPerPage,
    });
    return animals;
  } catch (error) {
    throw error;
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
    animal.eliminated = true;
    await animal.save();
  } catch (error) {
    throw error;
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
    throw error;
  }
};

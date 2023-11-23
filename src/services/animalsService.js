import Animal from "../models/animals.js";
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

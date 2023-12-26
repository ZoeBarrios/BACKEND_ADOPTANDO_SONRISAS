import { Op } from "sequelize";
import Adoption from "../models/adoption.js";
import Animal from "../models/animal.js";
import Person from "../models/person.js";
import { updateAnimal } from "./animalsService.js";

export const createAdoption = async (createAdoptionDTO) => {
  const animal = await Animal.findByPk(createAdoptionDTO.animal_id);
  if (!animal) {
    return null;
  }
  return await Adoption.create(createAdoptionDTO);
};

export const getAdoption = async (animal_id, person_id) => {
  const adoption = await Adoption.findOne({
    where: {
      animal_id: animal_id,
      person_id: person_id,
    },
    include: [
      {
        model: Animal,
      },
      {
        model: Person,
      },
    ],
  });

  return adoption;
};
export const getAllAdoptionByOrganizationId = async (organization_id) => {
  const adoptions = await Adoption.findAll({
    include: [
      {
        model: Animal,
        where: {
          organization_id: organization_id,
        },
      },
      {
        model: Person,
      },
    ],
  });

  return adoptions;
};

export const getAllAdoptionsByUserId = async (person_id) => {
  const adoption = await Adoption.findAll({
    where: {
      person_id: person_id,
    },
    include: [
      {
        model: Animal,
      },
    ],
  });

  return adoption;
};

export const acceptAdoption = async (animal_id, person_id) => {
  const adoption = await Adoption.update(
    { isAccepted: true },
    {
      where: {
        animal_id: animal_id,
        person_id: person_id,
      },
    }
  );
  await Adoption.update(
    { isAccepted: false, isCancelled: true },
    {
      where: {
        animal_id: animal_id,
        person_id: {
          [Op.ne]: person_id,
        },
      },
    }
  );
  return adoption;
};

export const cancelAdoption = async (animal_id, person_id) => {
  const adoption = await Adoption.update(
    { isCancelled: true },
    {
      where: {
        animal_id: animal_id,
        person_id: person_id,
      },
    }
  );
  await updateAnimal(animal_id, {
    adopted: false,
  });
  return adoption;
};

export const cancelAllAdoptionsByAnimal = async (animal_id) => {
  const adoption = await Adoption.update(
    { isCancelled: true },
    {
      where: {
        animal_id: animal_id,
        isAccepted: false,
      },
    }
  );

  return adoption;
};

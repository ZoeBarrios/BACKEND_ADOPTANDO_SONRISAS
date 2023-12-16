import Adoption from "../models/adoption.js";
import Animal from "../models/animal.js";
import Person from "../models/person.js";

export const createAdoption = async (createAdoptionDTO) => {
  const animal = await Animal.findByPk(createAdoptionDTO.animal_id);
  if (!animal) {
    return null;
  }
  return await Adoption.create(createAdoptionDTO);
};

export const getAdoptions = async (organizationId) => {
  const adoptions = await Adoption.findAll({
    where: {
      organization_id: organizationId,
    },
    include: [
      {
        model: Animal,
      },
    ],
  });
  return adoptions;
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

export const getAllADoptionByOrganizationId = async (organization_id) => {
  const adoption = await Adoption.findAll({
    include: [
      {
        model: Animal,
        where: {
          organization_id: organization_id,
        },
      },
    ],
  });

  return adoption;
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

export const getPendingAdoptions = async (organization_id) => {
  const adoptions = await Adoption.findAll({
    where: {
      isAccepted: false,
      isCancelled: false,
    },
    include: [
      {
        model: Animal,
        where: {
          organization_id: organization_id,
        },
      },
    ],
  });
  return adoptions;
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
  return adoption;
};

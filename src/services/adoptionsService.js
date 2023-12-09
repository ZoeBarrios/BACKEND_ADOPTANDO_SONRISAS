import { Op } from "sequelize";
import Adoption from "../models/adoption.js";
import Animal from "../models/animals.js";

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
  });
  return adoptions;
};

export const getAdoption = async (animal_id, organization_id) => {
  const adoption = await Adoption.findOne({
    where: {
      animal_id: animal_id,
      organization_id: organization_id,
    },
  });

  return adoption;
};

export const getAllAdoptionsByMonth = async (organization_id, num_month) => {
  const year = new Date().getFullYear();
  const startDate = new Date(year, num_month - 1, 1);
  const endDate = new Date(year, num_month, 0);

  try {
    const adoptions = await Adoption.findAll({
      where: {
        adoption_date: {
          [Op.gt]: startDate,
          [Op.lte]: endDate,
        },
        organization_id: organization_id,
      },
    });
    return adoptions.length;
  } catch (error) {
    throw error;
  }
};

export const getAllAdoptionsByYear = async (organization_id, year) => {
  const adoptions = await Adoption.findAll({
    where: {
      adoption_date: {
        [Op.gt]: new Date(year, 0, 1),
        [Op.lte]: new Date(year, 11, 31),
      },
      organization_id: organization_id,
    },
  });
  return adoptions.length;
};

import Case from "../models/cases.js";
import Animal from "../models/animals.js";

export const createCase = async (createCaseDTO) => {
  try {
    let newCase = await Case.create(createCaseDTO);
    const animal = await Animal.findByPk(newCase.animal_id);
    newCase.animal = animal;
    return newCase;
  } catch (error) {
    throw error;
  }
};

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

export const getAllCases = async (page) => {
  try {
    const cases = await Case.findAll({
      include: [
        {
          model: Animal,
          as: "animal",
        },
      ],
    });

    return cases;
  } catch (error) {
    throw error;
  }
};

export const getCaseById = async (id) => {
  try {
    const case_ = await Case.findByPk(id, {
      include: [
        {
          model: Animal,
          as: "animal",
        },
      ],
    });
    if (!case_) throw new Error("El caso no existe");
    return case_;
  } catch (error) {
    throw error;
  }
};

export const updateCase = async (id, updateCaseDTO) => {
  try {
    const case_ = await Case.findByPk(id);
    if (!case_) return null;
    const updatedCase = await case_.update(updateCaseDTO);
    return updatedCase;
  } catch (error) {
    throw error;
  }
};

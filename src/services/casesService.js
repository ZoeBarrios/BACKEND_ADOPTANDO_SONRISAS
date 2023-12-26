import Case from "../models/cases.js";
import Animal from "../models/animal.js";
import { deleteImages } from "./imgService.js";
import { getByCaseId } from "./case_imgsService.js";

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

export const getAllCases = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  try {
    const cases = await Case.findAll({
      where: {
        isDeleted: false,
      },
      include: [
        {
          model: Animal,
          as: "animal",
        },
      ],
      offset,
      limit,
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
    const case_ = await Case.findByPk(id, {
      include: [
        {
          model: Animal,
          as: "animal",
        },
      ],
    });
    if (!case_) return null;
    const updatedCase = await case_.update(updateCaseDTO);
    return updatedCase;
  } catch (error) {
    throw error;
  }
};

export const getCasesByOrganization = async (organization_id) => {
  try {
    const cases = await Case.findAll({
      include: [
        {
          model: Animal,
          as: "animal",
          where: {
            organization_id,
          },
        },
      ],
    });
    return cases;
  } catch (error) {
    throw error;
  }
};

export const deleteByCaseId = async (id) => {
  try {
    const case_ = await Case.findByPk(id);
    if (!case_) return null;
    const deletedCase = await case_.update({ isDeleted: true });
    const imgs = await getByCaseId(id);

    if (!imgs) return deletedCase;
    await deleteImages(imgs);
    return deletedCase;
  } catch (error) {
    throw error;
  }
};

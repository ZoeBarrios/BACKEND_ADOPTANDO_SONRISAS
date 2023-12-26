import {
  createImgCases,
  deleteImgsByCase,
  getByCaseId,
} from "../services/case_imgsService.js";
import {
  createCase,
  getAllCases,
  getCaseById,
  updateCase,
  getCasesByOrganization,
  deleteByCaseId,
} from "../services/casesService.js";
import createCaseDTO from "../DTOS/cases/createCaseDTO.js";
import caseDTO from "../DTOS/cases/caseDTO.js";
import casesDTO from "../DTOS/cases/casesDTO.js";
import updateCaseDTO from "../DTOS/cases/updateCaseDTO.js";
import IdScheme from "../validationSchemes/idScheme.js";
import parseValidationError from "../utils/parseValidationError.js";

export const registerCase = async (req, res, next) => {
  try {
    const files = req.files;

    const CaseDTO = createCaseDTO.fromRequest(req);
    const newCase = await createCase(CaseDTO);
    const imgsUrls = await createImgCases(files, newCase.case_id);

    return res.success(201, caseDTO.toResponse(newCase, imgsUrls));
  } catch (error) {
    next(error);
  }
};

export const getCases = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  try {
    const cases = await getAllCases(page, limit);
    const dtos = await Promise.all(
      cases.map(async (case_) => {
        const imgs = await getByCaseId(case_.case_id);
        return casesDTO.toResponse(case_, imgs);
      })
    );

    return res.success(200, dtos);
  } catch (error) {
    next(error);
  }
};

export const getCase = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const case_ = await getCaseById(id);
    const imgs = await getByCaseId(id);
    return res.success(200, caseDTO.toResponse(case_, imgs));
  } catch (error) {
    next(error);
  }
};

export const updateOneCase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const updateDTO = updateCaseDTO.fromRequest(req);
    const updatedCase = await updateCase(id, updateDTO);
    return res.success(200, caseDTO.toResponse(updatedCase));
  } catch (error) {
    next(error);
  }
};

export const getCasesByOrganizationId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }
    const cases = await getCasesByOrganization(id);

    return res.success(
      200,
      cases.map((case_) => caseDTO.toResponse(case_))
    );
  } catch (error) {
    next(error);
  }
};

export const deleteCase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = IdScheme.validate({ id });
    if (error) {
      parseValidationError(error);
    }

    await deleteByCaseId(id);
    //BORRAR IMAGENES DE FIREBASE
    await deleteImgsByCase(id);
    return res.success(204, "Eliminado correctamente");
  } catch (error) {
    next(error);
  }
};

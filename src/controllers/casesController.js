import { createImgCases, getByCaseId } from "../services/case_imgsService.js";
import {
  createCase,
  getAllCases,
  getCaseById,
} from "../services/casesService.js";
import createCaseDTO from "../DTOS/cases/createCaseDTO.js";
import caseDTO from "../DTOS/cases/caseDTO.js";
import casesDTO from "../DTOS/cases/casesDTO.js";

export const registerCase = async (req, res) => {
  const files = req.files;
  const CaseDTO = createCaseDTO.fromRequest(req);
  try {
    const newCase = await createCase(CaseDTO);
    const imgsUrls = await createImgCases(files, newCase.id);

    return res.status(201).json(caseDTO.toResponse(newCase, imgsUrls));
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCases = async (req, res) => {
  try {
    const cases = await getAllCases();
    const dtos = await Promise.all(
      cases.map(async (case_) => {
        const imgs = await getByCaseId(case_.id);
        return casesDTO.toResponse(case_, imgs);
      })
    );

    return res.status(200).json(dtos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCase = async (req, res) => {
  const { id } = req.params;
  try {
    const case_ = await getCaseById(id);
    const imgs = await getByCaseId(id);
    return res.status(200).json(caseDTO.toResponse(case_, imgs));
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

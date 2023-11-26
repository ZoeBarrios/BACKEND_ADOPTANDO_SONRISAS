import { createImgCases } from "../services/case_imgsService.js";
import { createCase } from "../services/casesService.js";
import createCaseDTO from "../DTOS/cases/createCaseDTO.js";
import caseDTO from "../DTOS/cases/caseDTO.js";

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

import creatFinancial_infoDTO from "../DTOS/finanancial_info/createFinancial_infoDTO.js";
import updateFinancial_infoDTO from "../DTOS/finanancial_info/updateFinancial_infoDTO.js";
import {
  createFinancial_info,
  getFinancial_infoByOganization,
  updateFinancial_info,
} from "../services/financial_infoService.js";

export const registerFinancialInfo = async (req, res, next) => {
  try {
    const createDTO = creatFinancial_infoDTO.fromRequest(req);
    const financialInfo = await createFinancial_info(createDTO);
    return res.success(201, financialInfo);
  } catch (error) {
    next(error);
  }
};

export const getFinancialInfoByOrganization = async (req, res, next) => {
  try {
    const { organization_id } = req.params;
    const financialInfo = await getFinancial_infoByOganization(organization_id);
    return res.success(200, financialInfo);
  } catch (error) {
    next(error);
  }
};

export const updateFinancialInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateDTO = updateFinancial_infoDTO.fromRequest(req);
    const financialInfo = await updateFinancial_info(id, updateDTO);
    return res.success(200, financialInfo);
  } catch (error) {
    next(error);
  }
};

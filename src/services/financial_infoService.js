import Financial_Info from "../models/financial_info.js";

export const createFinancial_info = async (createFinancial_infoDTO) => {
  const f_i = await Financial_Info.create(createFinancial_infoDTO);
  return f_i;
};

export const getFinancial_infoByOganization = async (organization_id) => {
  const f_i = await Financial_Info.findOne({ where: { organization_id } });
  if (!f_i) return null;
  return f_i;
};

export const updateFinancial_info = async (id, updateFinancial_infoDTO) => {
  const f_i = await Financial_Info.update(updateFinancial_infoDTO, {
    where: { id },
  });
  return f_i;
};

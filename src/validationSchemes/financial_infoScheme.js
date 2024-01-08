import Joi from "joi";

const financialInfoScheme = Joi.object({
  organization_id: Joi.number().required(),
  cbu: Joi.string().allow(null).empty(""),
  alias: Joi.string().allow(null).empty(""),
  mp_link: Joi.string().allow(null).empty(""),
});

export default financialInfoScheme;

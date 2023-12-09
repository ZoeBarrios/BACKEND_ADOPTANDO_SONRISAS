import Joi from "joi";

const financialInfoScheme = Joi.object({
  organization_id: Joi.number().required(),
  cbu: Joi.string(),
  alias: Joi.number(),
  mp_link: Joi.string(),
});

export default financialInfoScheme;

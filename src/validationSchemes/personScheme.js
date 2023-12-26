import Joi from "joi";

const personScheme = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string(),
  organization_id: Joi.number(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string(),
});

export default personScheme;

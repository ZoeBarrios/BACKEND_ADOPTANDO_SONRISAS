import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  organization_id: Joi.number().required(),
  phone: Joi.string(),
});

export default userSchema;

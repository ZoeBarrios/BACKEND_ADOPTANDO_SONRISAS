import Joi from "joi";

const loginSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export default loginSchema;

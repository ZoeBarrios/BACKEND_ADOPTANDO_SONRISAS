import Joi from "joi";

export const animalScheme = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).required(),
  sex: Joi.string().min(1).max(1).required(),
  size: Joi.string().min(1).max(20).required(),
  birthdate: Joi.date().required(),
  img: Joi.string().min(1).max(255).required(),
  organization_id: Joi.number().integer().required(),
  type: Joi.string().min(1).required(),
});

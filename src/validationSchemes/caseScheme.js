import Joi from "joi";

const caseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  animal_id: Joi.number().required(),
  images: Joi.array(),
});

export default caseSchema;

import Joi from "joi";

const caseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  animal_id: Joi.number().required(),
  imgs: Joi.array().items(
    Joi.object({
      originalname: Joi.string().required(),
      mimetype: Joi.string().required(),
      size: Joi.number().required(),
      key: Joi.string().required(),
      location: Joi.string().required(),
    })
  ),
});

export default caseSchema;

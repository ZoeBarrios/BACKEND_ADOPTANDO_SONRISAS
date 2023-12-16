import Joi from "joi";

const IdScheme = Joi.object({
  id: Joi.number().required(),
});

export default IdScheme;

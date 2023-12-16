import Joi from "joi";

const AdoptionScheme = Joi.object({
  animal_id: Joi.number().required(),
  person_id: Joi.number().required(),
});

export default AdoptionScheme;

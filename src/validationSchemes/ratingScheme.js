import Joi from "joi";

const ratingSchema = Joi.object({
  animal_id: Joi.number().required(),
  rater_id: Joi.number().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional(),
  person_id: Joi.number().required(),
});

export default ratingSchema;

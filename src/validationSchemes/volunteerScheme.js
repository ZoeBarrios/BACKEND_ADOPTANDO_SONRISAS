import Joi from "joi";

const volunteerSchema = Joi.object({
  organization_id: Joi.number().required(),
  volunteer_id: Joi.number().required(),
  activity: Joi.string().required(),
});

export default volunteerSchema;

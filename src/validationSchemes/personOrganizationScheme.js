import Joi from "joi";

const personOrganizationSchema = Joi.object({
  organization_id: Joi.number().required(),
  person_id: Joi.number().required(),
  activity_id: Joi.number().required(),
});

export default personOrganizationSchema;

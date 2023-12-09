import Joi from "joi";

const organizationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  instagram_link: Joi.string(),
  facebook_link: Joi.string(),
});

export default organizationSchema;

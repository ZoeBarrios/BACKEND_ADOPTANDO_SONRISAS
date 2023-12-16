import Joi from "joi";

const organizationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().optional().empty("").allow(null),
  email: Joi.string().email().required(),
  instagram_link: Joi.string().optional().empty("").allow(null),
  facebook_link: Joi.string().optional().empty("").allow(null),
});

export default organizationSchema;

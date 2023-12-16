import parseValidationError from "../../utils/parseValidationError.js";
import personOrganizationSchema from "../../validationSchemes/personOrganizationScheme.js";

export default class CreatePersonOrganization {
  static fromRequest(req) {
    const { error, values } = personOrganizationSchema.validate(req.body);
    if (error) {
      parseValidationError(error);
    }
    const { organization_id, person_id, activity_id } = req.body;

    return {
      organization_id,
      person_id,
      activity_id,
    };
  }
}

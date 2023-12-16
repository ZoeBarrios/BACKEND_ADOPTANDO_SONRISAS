import volunteerSchema from "../../validationSchemes/volunteerScheme";
import { ERRORS } from "../../utils/constants";
import parseValidationError from "../../utils/parseValidationError";

export default class CreateVolunteerDTO {
  constructor(organization_id, volunteer_id, activity) {
    this.organization_id = organization_id;
    this.volunteer_id = volunteer_id;
    this.activity = activity;
  }

  static fromRequest(req) {
    const { error, value } = volunteerSchema.validate(request.body);

    if (error) {
      parseValidationError(error);
    }
    const { organization_id, volunteer_id, activity } = req.body;
    return new CreateVolunteerDTO(organization_id, volunteer_id, activity);
  }
}

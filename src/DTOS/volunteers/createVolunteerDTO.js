import volunteerSchema from "../../../validationSchemes/volunteerScheme";
import { ERRORS } from "../../utils/constants";

export default class CreateVolunteerDTO {
  constructor(organization_id, volunteer_id, activity) {
    this.organization_id = organization_id;
    this.volunteer_id = volunteer_id;
    this.activity = activity;
  }

  static fromRequest(req) {
    const { error, value } = volunteerSchema.validate(request.body);

    if (error) {
      const errorMessages = error.details.map((err) => {
        if (err.type === "any.required") {
          return `El campo ${err.context.key} es obligatorio`;
        }
        return err.message;
      });

      const infError = {
        ...ERRORS.ValidationError,
        message: errorMessages,
      };

      throw infError;
    }
    const { organization_id, volunteer_id, activity } = req.body;
    return new CreateVolunteerDTO(organization_id, volunteer_id, activity);
  }
}

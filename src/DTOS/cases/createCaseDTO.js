import caseSchema from "../../../validationSchemes/caseScheme.js";
import parseValidationError from "../../utils/parseValidationError.js";

export default class CreateCaseDTO {
  constructor(title, description, imgs, animal_id) {
    this.title = title;
    this.description = description;
    this.imgs = imgs;
    this.animal_id = animal_id;
  }
  static fromRequest(req) {
    const { error, value } = caseSchema.validate(req.body);
    if (error) {
      parseValidationError(error);
    }
    const { title, description, animal_id } = req.body;

    const imgs = req.files;
    return new CreateCaseDTO(title, description, imgs, animal_id);
  }
}

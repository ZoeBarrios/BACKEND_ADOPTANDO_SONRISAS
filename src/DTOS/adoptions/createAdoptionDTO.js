import AdoptionScheme from "../../validationSchemes/adoptionScheme.js";
import parseValidationError from "../../utils/parseValidationError.js";

export default class createAdoptionDTO {
  constructor({ animal_id, person_id }) {
    this.animal_id = animal_id;
    this.person_id = person_id;
  }

  static fromRequest(req) {
    const { error, value } = AdoptionScheme.validate(req.body);
    if (error) {
      parseValidationError(error);
    }
    return new createAdoptionDTO(req.body);
  }
}

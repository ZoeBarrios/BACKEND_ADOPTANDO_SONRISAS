import ratingSchema from "../../validationSchemes/ratingScheme.js";
import parseValidationError from "../../utils/parseValidationError.js";

export default class createRatingDTO {
  constructor(rating) {
    this.person_id = rating.person_id;
    this.animal_id = rating.animal_id;
    this.rating = rating.rating;
    this.comment = rating.comment;
    this.rater_id = rating.rater_id;
  }

  static fromRequest(req) {
    const { error, values } = ratingSchema.validate(req.body);
    if (error) {
      parseValidationError(error);
    }
    return new createRatingDTO(req.body);
  }
}

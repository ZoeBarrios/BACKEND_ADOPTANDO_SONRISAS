export default class ratingDTO {
  constructor(rating) {
    this.person_id = rating.person_id;
    this.animal = rating.animal;
    this.rating = rating.rating;
    this.comment = rating.comment;
    this.rater_id = rating.rater_id;
    this.rater = rating.rater;
    this.date = rating.date;
  }
  static toResponse(rating) {
    return new ratingDTO(rating);
  }
}

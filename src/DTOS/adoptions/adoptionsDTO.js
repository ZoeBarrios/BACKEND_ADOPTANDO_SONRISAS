export default class AdoptionsDTO {
  constructor(
    animal,
    person_id,
    adoption_date,
    isAccepted,
    isCancelled,
    person
  ) {
    this.animal = animal;
    this.person_id = person_id;
    this.adoption_date = adoption_date;
    this.isAccepted = isAccepted;
    this.isCancelled = isCancelled;
    this.person = person;
  }
  static toResponse(adoption) {
    const {
      animal,
      person_id,
      adoption_date,
      isAccepted,
      isCancelled,
      person,
    } = adoption;
    return new AdoptionsDTO(
      animal,
      person_id,
      adoption_date,
      isAccepted,
      isCancelled,
      person
    );
  }
}

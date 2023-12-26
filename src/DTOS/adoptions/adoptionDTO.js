export default class adoptionDTO {
  constructor({ animal, person, adoption_date }) {
    this.animal = animal;
    this.person = person;
    this.adoption_date = adoption_date;
  }

  static toResponse(adoption) {
    const { animal, person, adoption_date } = adoption;
    return new adoptionDTO({
      animal,
      person,
      adoption_date,
    });
  }
}

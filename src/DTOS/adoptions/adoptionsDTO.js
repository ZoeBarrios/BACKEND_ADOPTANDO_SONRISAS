import animalDTO from "../animals/animalDTO.js";

export default class AdoptionsDTO {
  constructor(animal, person_id, adoption_date, isAccepted, isCancelled) {
    this.animal = animalDTO.toResponse(animal);
    this.person_id = person_id;
    this.adoption_date = adoption_date;
    this.isAccepted = isAccepted;
    this.isCancelled = isCancelled;
  }
  static toResponse(adoption) {
    const { animal, person_id, adoption_date, isAccepted, isCancelled } =
      adoption;
    return new AdoptionsDTO(
      animal,
      person_id,
      adoption_date,
      isAccepted,
      isCancelled
    );
  }
}

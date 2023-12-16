import animalDTO from "../animals/animalDTO.js";
import userDTO from "../users/userDTO.js";
export default class adoptionDTO {
  constructor({ animal, person, adoption_date }) {
    this.animal = animalDTO.toResponse(animal);
    this.person = userDTO.toResponse(person);
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

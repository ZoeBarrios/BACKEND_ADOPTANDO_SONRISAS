export default class animalDTO {
  constructor(name, description, sex, size, birthdate, img_url) {
    this.name = name;
    this.description = description;
    this.sex = sex;
    this.size = size;
    this.birthdate = birthdate;
    this.img_url = img_url;
  }
  static toResponse(animal) {
    const { name, description, sex, size, birthdate, img_url } = animal;
    return new animalDTO(name, description, sex, size, birthdate, img_url);
  }
}

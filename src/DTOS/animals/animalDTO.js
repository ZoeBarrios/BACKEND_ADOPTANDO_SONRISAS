export default class animalDTO {
  constructor(
    animal_id,
    name,
    description,
    sex,
    size,
    birthdate,
    img_url,
    organization
  ) {
    this.animal_id = animal_id;
    this.name = name;
    this.description = description;
    this.sex = sex;
    this.size = size;
    this.birthdate = birthdate;
    this.img_url = img_url;
    this.organization = organization;
  }
  static toResponse(animal) {
    const {
      animal_id,
      name,
      description,
      sex,
      size,
      birthdate,
      img_url,
      organization,
    } = animal;
    return new animalDTO(
      animal_id,
      name,
      description,
      sex,
      size,
      birthdate,
      img_url,
      organization
    );
  }
}

export default class animalDTO {
  constructor(
    id,
    name,
    description,
    sex,
    size,
    birthdate,
    img_url,
    organization
  ) {
    this.id = id;
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
      id,
      name,
      description,
      sex,
      size,
      birthdate,
      img_url,
      organization,
    } = animal;
    return new animalDTO(
      id,
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

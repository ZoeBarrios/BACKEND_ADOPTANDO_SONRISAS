export default class animalsDTO {
  constructor(
    animal_id,
    name,
    sex,
    size,
    birthdate,
    img_url,
    organization,
    isDeleted
  ) {
    this.animal_id = animal_id;
    this.name = name;
    this.sex = sex;
    this.size = size;
    this.birthdate = birthdate;
    this.img_url = img_url;
    this.organization = organization;
    this.isDeleted = isDeleted;
  }
  static toResponse(animals) {
    let dtos = animals.map((animal) => {
      const {
        animal_id,
        name,
        sex,
        size,
        birthdate,
        img_url,
        organization,
        isDeleted,
      } = animal;
      return new animalsDTO(
        animal_id,
        name,
        sex,
        size,
        birthdate,
        img_url,
        organization,
        isDeleted
      );
    });
    return dtos;
  }
}

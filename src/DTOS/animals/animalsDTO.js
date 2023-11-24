export default class animalsDTO {
  constructor(name, sex, size, birthdate, img_url) {
    this.name = name;
    this.sex = sex;
    this.size = size;
    this.birthdate = birthdate;
    this.img_url = img_url;
  }
  static toResponse(animals) {
    let dtos = animals.map((animal) => {
      const { name, sex, size, birthdate, img_url } = animal;
      return new animalsDTO(name, sex, size, birthdate, img_url);
    });
    return dtos;
  }
}

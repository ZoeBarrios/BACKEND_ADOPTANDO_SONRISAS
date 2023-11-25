export default class animalsDTO {
  constructor(id, name, sex, size, birthdate, img_url,organization) {
    this.id = id;
    this.name = name;
    this.sex = sex;
    this.size = size;
    this.birthdate = birthdate;
    this.img_url = img_url;
    this.organization = organization;
  }
  static toResponse(animals) {
    let dtos = animals.map((animal) => {
      const { id, name, sex, size, birthdate, img_url,organization } = animal;
      return new animalsDTO(id, name, sex, size, birthdate, img_url,organization);
    });
    return dtos;
  }
}

export default class createAnimalDTO {
  constructor(name, description, sex, size, birthdate, img) {
    this.name = name;
    this.description = description;
    this.sex = sex;
    this.size = size;
    this.birthdate = birthdate;
    this.img_url = img;
  }
  static fromRequest(req) {
    const { name, description, sex, size, birthdate, img } = req.body;
    return new createAnimalDTO(name, description, sex, size, birthdate, img);
  }
}

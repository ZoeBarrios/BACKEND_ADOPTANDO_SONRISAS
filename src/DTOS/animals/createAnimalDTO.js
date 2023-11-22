export class createAnimalDTO {
  constructor(name, description, sex, size, age, img) {
    this.name = name;
    this.description = description;
    this.sex = sex;
    this.size = size;
    this.age = age;
    this.img_url = img;
  }
  static fromRequest(req) {
    const { name, description, sex, size, age, img } = req.body;
    return new createAnimalDTO(name, description, sex, size, age, img);
  }
}

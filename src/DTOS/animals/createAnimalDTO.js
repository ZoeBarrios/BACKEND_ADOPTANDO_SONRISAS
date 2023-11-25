export default class createAnimalDTO {
  constructor(name, description, sex, size, birthdate, img, organization_id) {
    this.name = name;
    this.description = description;
    this.sex = sex;
    this.size = size;
    this.birthdate = birthdate;
    this.img_url = img;
    this.organization_id = organization_id;
  }
  static fromRequest(req) {
    const { name, description, sex, size, birthdate, img, organization_id } =
      req.body;
    return new createAnimalDTO(
      name,
      description,
      sex,
      size,
      birthdate,
      img,
      organization_id
    );
  }
}

import parseValidationError from "../../utils/parseValidationError.js";
import { animalScheme } from "../../validationSchemes/animalScheme.js";

export default class createAnimalDTO {
  constructor(
    name,
    description,
    sex,
    size,
    birthdate,
    img,
    organization_id,
    type
  ) {
    this.name = name;
    this.description = description;
    this.sex = sex;
    this.size = size;
    this.birthdate = birthdate;
    this.img_url = img;
    this.organization_id = organization_id;
    this.type = type;
  }
  static fromRequest(req) {
    const { error, value } = animalScheme.validate(req.body);
    if (error) {
      parseValidationError(error);
    }
    const {
      name,
      description,
      sex,
      size,
      birthdate,
      img,
      organization_id,
      type,
    } = req.body;

    return new createAnimalDTO(
      name,
      description,
      sex,
      size,
      birthdate,
      img,
      organization_id,
      type
    );
  }
}

import organizationDTO from "../organizations/organizationDTO.js";
export default class animalDTO {
  constructor(
    animal_id,
    name,
    description,
    sex,
    size,
    birthdate,
    img_url,
    isDeleted,
    organization_id,
    organization,
    type
  ) {
    this.animal_id = animal_id;
    this.name = name;
    this.description = description;
    this.sex = sex;
    this.size = size;
    this.birthdate = birthdate;
    this.img_url = img_url;
    this.organization_id = organization_id;
    isDeleted, (this.organization = organizationDTO.toResponse(organization));
    this.type = type;
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
      isDeleted,
      organization_id,
      organization,
      type,
    } = animal;
    return new animalDTO(
      animal_id,
      name,
      description,
      sex,
      size,
      birthdate,
      img_url,
      isDeleted,
      organization_id,
      organization,
      type
    );
  }
}

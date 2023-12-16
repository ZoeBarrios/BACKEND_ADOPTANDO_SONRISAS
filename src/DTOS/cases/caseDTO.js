export default class caseDTO {
  constructor(case_id, title, description, imgs, animal) {
    this.case_id = case_id;
    this.title = title;
    this.description = description;
    this.imgs = imgs;
    this.animal = animal;
  }

  static toResponse(caso, imgs) {
    const { case_id, title, description, animal } = caso;
    return new caseDTO(case_id, title, description, imgs, animal);
  }
}

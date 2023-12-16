export default class casesDTO {
  constructor(case_id, title, imgs, description) {
    this.case_id = case_id;
    this.title = title;
    this.imgs = imgs;
    this.description = description;
  }

  static toResponse(caso, imgs) {
    const { title, case_id, description } = caso;
    return new casesDTO(case_id, title, imgs, description);
  }
}

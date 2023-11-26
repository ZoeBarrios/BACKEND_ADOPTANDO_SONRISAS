export default class caseDTO {
  constructor(id, title, imgs) {
    this.id = id;
    this.title = title;
    this.imgs = imgs;
  }

  static toResponse(caso, imgs) {
    const { title, id } = caso;
    return new caseDTO(id, title, imgs);
  }
}

export default class casesDTO {
  constructor(id, title, imgs, description) {
    this.id = id;
    this.title = title;
    this.imgs = imgs;
    this.description = description;
  }

  static toResponse(caso, imgs) {
    const { title, id, description } = caso;
    return new casesDTO(id, title, imgs, description);
  }
}

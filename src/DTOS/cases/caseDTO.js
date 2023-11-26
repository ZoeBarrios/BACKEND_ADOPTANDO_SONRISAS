export default class caseDTO {
  constructor(id,title, description, imgs, animal) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgs = imgs;
    this.animal = animal;
  }

  static toResponse(caso, imgs) {
    const { id,title, description, animal } = caso;
    return new caseDTO(id,title, description, imgs, animal);
  }
}

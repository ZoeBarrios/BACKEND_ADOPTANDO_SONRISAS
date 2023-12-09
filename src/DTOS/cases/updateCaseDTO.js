export default class updateCaseDTO {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }

  static fromRequest(req) {
    const { title, description } = req.body;
    return new updateCaseDTO(title, description);
  }
}

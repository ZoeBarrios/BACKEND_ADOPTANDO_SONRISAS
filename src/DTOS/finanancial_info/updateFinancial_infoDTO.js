export default class updateFinancial_infoDTO {
  constructor(cbu, alias, mp_link) {
    this.cbu = cbu;
    this.alias = alias;
    this.mp_link = mp_link;
  }

  static fromRequest(req) {
    return new updateFinancial_infoDTO(
      req.body.cbu,
      req.body.alias,
      req.body.mp_link
    );
  }
}

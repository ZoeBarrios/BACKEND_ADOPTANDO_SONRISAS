export default class createAdoptionDTO {
  constructor({
    animal_id,
    organization_id,
    responsable_name,
    responsable_phone,
    responsable_address,
  }) {
    this.animal_id = animal_id;
    this.organization_id = organization_id;
    this.responsable_name = responsable_name;
    this.responsable_phone = responsable_phone;
    this.responsable_address = responsable_address;
  }

  static fromRequest(req) {
    const {
      animal_id,
      organization_id,
      responsable_name,
      responsable_phone,
      responsable_address,
    } = req.body;
    return new createAdoptionDTO({
      animal_id,
      organization_id,
      responsable_name,
      responsable_phone,
      responsable_address,
    });
  }
}

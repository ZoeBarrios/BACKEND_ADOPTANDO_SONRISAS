export default class adoptionDTO {
  constructor({
    animal_id,
    adoption_date,
    responsable_name,
    responsable_phone,
    responsable_address,
  }) {
    this.animal_id = animal_id;
    this.adoption_date = adoption_date;
    this.responsable_name = responsable_name;
    this.responsable_phone = responsable_phone;
    this.responsable_address = responsable_address;
  }

  static toResponse(adoption) {
    const {
      animal_id,
      adoption_date,
      responsable_name,
      responsable_phone,
      responsable_address,
    } = adoption;
    return new adoptionDTO({
      animal_id,
      adoption_date,
      responsable_name,
      responsable_phone,
      responsable_address,
    });
  }
}

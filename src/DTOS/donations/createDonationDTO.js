export default class CreateDonationDTO {
  constructor(organization_id, total_amount, date, donator_name) {
    this.organization_id = organization_id;
    this.total_amount = total_amount;
    this.date = date;
    this.donator_name = donator_name;
  }

  static fromRequest(request) {
    return new CreateDonationDTO(
      request.body.organization_id,
      request.body.total_amount,
      request.body.date,
      request.body.donator_name
    );
  }
}

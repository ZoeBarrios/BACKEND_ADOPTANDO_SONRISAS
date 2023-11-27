export default class donationDTO {
  constructor(organization_id, total_amount, date, donator_name) {
    this.organization_id = organization_id;
    this.total_amount = total_amount;
    this.date = date;
    this.donator_name = donator_name;
  }

  static toResponse(donation) {
    return new donationDTO(
      donation.organization_id,
      donation.total_amount,
      donation.date,
      donation.donator_name
    );
  }
}

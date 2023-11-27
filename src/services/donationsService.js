import Donation from "../models/donation.js";
export const createDonation = async (donation) => {
  return await Donation.create(donation);
};

export const getDonations = async () => {
  return await Donation.findAll();
};

export const getDonationsByOrganizationId = async (organization_id) => {
  return await Donation.findAll({
    where: { organization_id },
  });
};

export const getDonationsByYear = async (year, organization_id) => {
  return await Donation.findAll({
    where: {
      date: {
        $between: [`${year}-01-01`, `${year}-12-31`],
      },
      organization_id,
    },
  });
};

export const getDonationsByMonth = async (month, organization_id) => {
  return await Donation.findAll({
    where: {
      date: {
        $between: [
          `${new Date().getFullYear()}-${month}-01`,
          `${new Date().getFullYear()}-${month}-31`,
        ],
      },
      organization_id,
    },
  });
};

import { Op, literal } from "sequelize";
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
        [Op.between]: [`${year}-01-01`, `${year}-12-31`],
      },
      organization_id,
    },
  });
};

export const getDonationsByMonth = async (month, organization_id) => {
  const startDate = new Date(new Date().getFullYear(), month - 1, 1);
  const endDate = new Date(new Date().getFullYear(), month, 0);

  return await Donation.findAll({
    where: {
      date: {
        [Op.between]: [
          literal(`DATE('${startDate.toISOString()}')`),
          literal(`DATE('${endDate.toISOString()}')`),
        ],
      },
      organization_id,
    },
  });
};

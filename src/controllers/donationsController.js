import CreateDonationDTO from "../DTOS/donations/createDonationDTO.js";
import {
  createDonation,
  getDonations,
  getDonationsByMonth,
  getDonationsByOrganizationId,
  getDonationsByYear,
} from "../services/donationsService.js";
import donationDTO from "../DTOS/donations/donationDTO.js";

export const registerDonation = async (req, res) => {
  const donation = CreateDonationDTO.fromRequest(req);
  try {
    const result = await createDonation(donation);
    res.status(201).json(donationDTO.toResponse(result));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const result = await getDonations();
    res
      .status(200)
      .json(result.map((donation) => donationDTO.toResponse(donation)));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDonationByOrganization = async (req, res) => {
  try {
    const result = await getDonationsByOrganizationId(req.params.id);
    res
      .status(200)
      .json(result.map((donation) => donationDTO.toResponse(donation)));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDonationsInYear = async (req, res) => {
  const { year, id } = req.params;
  try {
    const result = await getDonationsByYear(year, id);
    res
      .status(200)
      .json(result.map((donation) => donationDTO.toResponse(donation)));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDonationsInMonth = async (req, res) => {
  const { month, id } = req.params;
  try {
    const result = await getDonationsByMonth(month, id);
    res
      .status(200)
      .json(result.map((donation) => donationDTO.toResponse(donation)));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

import Animal from "../models/animal.js";
import Person from "../models/person.js";
import Rating from "../models/ratings.js";

export const createRating = async (rating) => {
  try {
    const ratingCreated = await Rating.create(rating, {
      returning: true,
      include: [
        {
          model: Person,
          as: "rater",
          attributes: ["name"],
        },
        {
          model: Animal,
          as: "animal",
          attributes: ["animal_id", "name"],
        },
      ],
    });
    return ratingCreated;
  } catch (error) {
    throw error;
  }
};

export const getRatingsByPersonId = async (person_id) => {
  try {
    const ratings = await Rating.findAll({
      where: {
        person_id,
      },
      include: [
        {
          model: Person,
          as: "rater",
          attributes: ["name"],
        },
        {
          model: Animal,
          as: "animal",
          attributes: ["animal_id", "name"],
        },
      ],
    });
    return ratings;
  } catch (error) {
    throw error;
  }
};

export const updateRating = async (rating) => {
  try {
    const updatedRating = await Rating.update(rating, {
      where: {
        person_id: rating.person_id,
        animal_id: rating.animal_id,
        date: rating.date,
      },
      returning: true,
    });
    return updatedRating;
  } catch (error) {
    throw error;
  }
};

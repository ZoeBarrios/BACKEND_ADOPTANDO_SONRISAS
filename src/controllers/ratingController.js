import createRatingDTO from "../DTOS/ratings/createRatingDTO.js";
import ratingDTO from "../DTOS/ratings/ratingDTO.js";
import {
  createRating,
  getRatingsByPersonId,
} from "../services/ratingService.js";

export const registerRating = async (req, res, next) => {
  try {
    const ratingToCreate = createRatingDTO.fromRequest(req);
    const rating = await createRating(ratingToCreate);
    res.success(201, ratingDTO.toResponse(rating));
  } catch (error) {
    next(error);
  }
};

export const getRatingsByPerson = async (req, res, next) => {
  try {
    const { person_id } = req.params;
    const ratings = await getRatingsByPersonId(person_id);
    res.success(
      200,
      ratings.map((rating) => ratingDTO.toResponse(rating))
    );
  } catch (error) {
    next(error);
  }
};

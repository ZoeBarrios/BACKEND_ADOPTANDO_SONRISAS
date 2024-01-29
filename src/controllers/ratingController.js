import createRatingDTO from "../DTOS/ratings/createRatingDTO.js";
import ratingDTO from "../DTOS/ratings/ratingDTO.js";
import { send } from "../services/emailService.js";
import { deleteUser, getById } from "../services/personService.js";
import {
  createRating,
  getRatingsByPersonId,
} from "../services/ratingService.js";

export const registerRating = async (req, res, next) => {
  try {
    const ratingToCreate = createRatingDTO.fromRequest(req);
    const rating = await createRating(ratingToCreate);
    const ratings = await getRatingsByPersonId(ratingToCreate.person_id);
    let avg =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
    if (isNaN(avg)) avg = 0;

    if (avg <= 2.5) {
      const email = process.env.EMAIL;
      await deleteUser(ratingToCreate.person_id);
      const person = await getById(ratingToCreate.person_id);
      await send(
        {
          to: person.email,
          subject: "Baja de usuario",
          text: `El usuario ${person.name} ha sido dado de baja por tener una  mala conducta en la plataforma.`,
        },
        email
      );
    }

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

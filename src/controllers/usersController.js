import userDTO from "../DTOS/users/userDTO.js";
import createUserDTO from "../DTOS/users/createUserDTO.js";
import { createUser, getById, getByUsername } from "../services/userService.js";

import { ERRORS } from "../utils/constants.js";

export const registerUser = async (req, res, next) => {
  const { role } = req.query;

  try {
    const newUser = createUserDTO.fromRequest(req);
    const user = await getByUsername(newUser.name);
    if (user) {
      return next(ERRORS.UserAlreadyExist);
    }
    let userCreated = newUser;

    if (role) {
      userCreated = await createUser(newUser, role);
    } else {
      return next(ERRORS.WrongRole);
    }
    return res.success(201, userDTO.toResponse(userCreated));
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getById(id);
    if (!user) {
      return next(ERRORS.UserNotFound);
    }
    return res.success(200, userDTO.toResponse(user));
  } catch (error) {
    next(error);
  }
};

export const updateOneUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getById(id);
    if (!user) {
      return next(ERRORS.UserNotFound);
    }
    const userUpdated = await user.update(req.body);
    return res.success(200, userDTO.toResponse(userUpdated));
  } catch (error) {
    next(error);
  }
};

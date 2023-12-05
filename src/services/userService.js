import User from "../models/user.js";
import Role from "../models/role.js";
import { createUsers_organizations } from "./users_organizationsService.js";
import { ERRORS, ROLES } from "../utils/constants.js";
import { hash } from "./bcryptService.js";

export const getByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email: email },
      include: [{ model: Role, attributes: ["role_name"] }],
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getByUsername = async (nombre) => {
  try {
    const user = await User.findOne({
      where: { name: nombre },
      include: [{ model: Role, attributes: ["role_name"] }],
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const savePasswordToken = async (user, token) => {
  try {
    user.token_password = token;
    await user.save();
    return true;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const createUser = async (user, role) => {
  try {
    const roleFound = await Role.findOne({ where: { role_name: role } });
    if (!roleFound) {
      throw new Error(ERRORS.WrongRole);
    }
    user.role_id = roleFound.id;
    user.password = await hash(user.password);
    const newUser = await User.create(user);
    if (role == ROLES.USER) {
      return newUser;
    }
    await createUsers_organizations({
      user_id: newUser.id,
      organization_id: user.organization_id,
    });
    return newUser;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const updateUser = async (user, user_id) => {
  try {
    const userFound = await User.findByPk(user_id);
    if (!userFound) {
      throw new Error(ERRORS.UserNotFound);
    }

    await userFound.update(user);
    return userFound;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const newPassword = async (user, password) => {
  try {
    user.password = await hash(password);
    await user.save();
    return true;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

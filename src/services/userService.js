import User from "../models/user.js";
import Role from "../models/role.js";
import { createUsers_organizations } from "./users_organizationsService.js";
import { ROLES } from "../utils/constants.js";
import { hash } from "./bcryptService.js";

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
    console.error("Error al obtener usuario por nombre:", error);
    throw new Error(error);
  }
};

export const createAdmin = async (user) => {
  try {
    const role = await Role.findOne({ where: { role_name: ROLES.ADMIN } });
    user.role_id = role.id;
    user.password = await hash(user.password);
    const newUser = await User.create(user);
    await createUsers_organizations({
      user_id: newUser.id,
      organization_id: user.organization_id,
    });
    return newUser;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error(error);
  }
};

export const createModerator = async (user) => {
  try {
    const role = await Role.findOne({ where: { role_name: ROLES.MODERATOR } });
    user.role_id = role.id;
    user.password = await hash(user.password);

    const newUser = await User.create(user);
    await createUsers_organizations({
      user_id: newUser.id,
      organization_id: user.organization_id,
    });
    return newUser;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error(error);
  }
};

import User from "../models/user.js";
import Role from "../models/role.js";

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

export const create = async (createDTO) => {};

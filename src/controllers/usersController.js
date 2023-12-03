import userDTO from "../DTOS/users/userDTO.js";
import createUserDTO from "../DTOS/users/createUserDTO.js";
import { createUser, getByUsername } from "../services/userService.js";
import {
  getTotalAdminsByOrganization,
  getTotalModeratorsByOrganization,
} from "../services/users_organizationsService.js";

export const registerUser = async (req, res) => {
  const { role } = req.query;

  try {
    const newUser = createUserDTO.fromRequest(req);
    const user = await getByUsername(newUser.name);
    if (user) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    let userCreated = newUser;

    if (role) {
      userCreated = await createUser(newUser, role);
    } else {
      return res.status(400).json({ message: "El rol no es válido" });
    }

    return res.status(201).json(userDTO.toResponse(userCreated));
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

export const getAdminsByOrganization = async (req, res) => {
  const { organization_id } = req.params;
  try {
    const users = await getTotalAdminsByOrganization(organization_id);
    if (!users) {
      return res.status(404).json({ message: "No hay usuarios" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(400).json({ msg: error.message });
  }
};

export const getModeratorsByOrganization = async (req, res) => {
  const { organization_id } = req.params;
  try {
    const users = await getTotalModeratorsByOrganization(organization_id);
    if (!users) {
      return res.status(404).json({ message: "No hay usuarios" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(400).json({ msg: error.message });
  }
};

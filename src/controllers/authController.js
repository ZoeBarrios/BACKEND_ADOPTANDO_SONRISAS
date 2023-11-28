import { compare } from "../services/bcryptService.js";
import { getByUsername } from "../services/userService.js";
import { createToken } from "../services/jwtService.js";
import loginUserDTO from "../DTOS/users/loginUserDTO.js";
import createOrganizationDTO from "../DTOS/organizations/createOrganizationDTO.js";
import { createOrganization } from "../services/organizationService.js";
import organizationDTO from "../DTOS/organizations/organizationDTO.js";

export const login = async (req, res) => {
  const { name, password } = loginUserDTO.fromRequest(req);

  if (!name || !password) {
    return res.status(400).send({ message: "Faltan campos por llenar" });
  }
  const user = await getByUsername(name);
  if (!user) {
    return res
      .status(400)
      .send({ message: "Usuario o contraseña incorrectos" });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return res
      .status(400)
      .send({ message: "Usuario o contraseña incorrectos" });
  }
  const UserDTO = loginUserDTO.toResponse(user);
  const token = createToken(UserDTO);
  return res.status(200).send({ message: "Login exitoso", token });
};

export const register = async (req, res) => {
  const organization = createOrganizationDTO.fromRequest(req);
  try {
    const organizationCreated = await createOrganization(organization);
    return res
      .status(201)
      .json(organizationDTO.toResponse(organizationCreated));
  } catch (error) {
    console.error("Error al registrar organización:", error);
    return res.status(400).json({ message: "Error en la petición" });
  }
};

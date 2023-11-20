import { compare } from "../services/bcryptService.js";
import { getByUsername } from "../services/userService.js";
import loginUserDTO from "../db/dtos/users/loginUserDTO.js";

export const login = async (req, res) => {
  const { nombre, contraseña } = loginUserDTO.fromRequest(req);

  if (!nombre || !contraseña) {
    return res.status(400).send({ message: "Faltan campos por llenar" });
  }
  const user = await getByUsername(nombre);
  if (!user) {
    return res
      .status(400)
      .send({ message: "Usuario o contraseña incorrectos" });
  }

  const isMatch = await compare(contraseña, user.password);

  if (!isMatch) {
    return res
      .status(400)
      .send({ message: "Usuario o contraseña incorrectos" });
  }
  return res
    .status(200)
    .send({ message: "Login exitoso", user: loginUserDTO.toResponse(user) });
};

export const logout = async (req, res) => {};

export const register = async (req, res) => {};

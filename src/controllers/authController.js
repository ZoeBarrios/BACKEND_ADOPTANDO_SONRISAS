import { compare } from "../services/bcryptService.js";
import { getByUsername } from "../services/userService.js";
import { createToken } from "../services/jwtService.js";
import loginUserDTO from "../DTOS/users/loginUserDTO.js";

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
  const UserDTO = loginUserDTO.toResponse(user);
  const token = createToken(UserDTO);
  return res
    .status(200)
    .send({ message: "Login exitoso", user: UserDTO, token });
};

export const register = async (req, res) => {};

import { appConfig } from "../config/config.js";
import { send } from "../services/emailService.js";

import {
  createToken,
  getInformationToken,
  verifyToken,
} from "../services/jwtService.js";
import { getOrganizationById } from "../services/organizationService.js";
import {
  getByEmail,
  getById,
  savePasswordToken,
} from "../services/userService.js";
export const sendEmail = async (req, res) => {
  const { destinatario, asunto, cuerpo } = req.body;
  const { id } = req.params;

  const organization = await getOrganizationById(id);
  try {
    const mailOptions = {
      to: destinatario,
      subject: asunto,
      text: cuerpo,
    };

    send(mailOptions, organization.email);

    return res.status(200).json({ message: "Email enviado exitosamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al enviar el email", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const user = await getByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "El usuario no existe" });
  }

  const token = createToken({
    id: user.id,
  });
  const url = `${appConfig.url}/api/email/reset_password/${token}`;
  const mailOptions = {
    to: email,
    subject: "Recuperar contraseña",
    text: `Para recuperar tu contraseña haz click en el siguiente link: ${url}`,
  };
  try {
    send(mailOptions, appConfig.email);
    await savePasswordToken(user, token);
    return res
      .status(200)
      .json({ message: "Email enviado exitosamente", token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al enviar el email", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  try {
    if (verifyToken(token)) {
      const info = getInformationToken(token);
      const user = await getById(info.id);

      if (!user) {
        return res.status(404).json({ message: "El usuario no existe" });
      }

      if (user.token_password == token) {
        return res.status(200).json({ message: "Token válido" });
      } else {
        return res.status(400).json({ message: "Token inválido" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Token inválido" });
  }
};

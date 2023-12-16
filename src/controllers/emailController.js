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
} from "../services/personService.js";
import { ERRORS } from "../utils/constants.js";

export const sendEmail = async (req, res, next) => {
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

    return res.success(200, "Email enviado exitosamente");
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  console.log(req.body);
  const person = await getByEmail(email);
  if (!person) {
    return next(ERRORS.UserNotFound);
  }

  const token = createToken({
    id: person.person_id,
  });
  const url = `${appConfig.url}/api/email/reset_password/${token}`;
  const mailOptions = {
    to: email,
    subject: "Recuperar contraseña",
    text: `Para recuperar tu contraseña haz click en el siguiente link: ${url}`,
  };
  try {
    send(mailOptions, appConfig.email);
    await savePasswordToken(person, token);
    return res.success(200, token);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  try {
    if (verifyToken(token)) {
      const info = getInformationToken(token);
      const person = await getById(info.id);

      if (!person) {
        return next(ERRORS.UserNotFound);
      }

      if (person.token_password == token) {
        return res.success(200, "Token válido");
      } else {
        return next(ERRORS.Unauthorized);
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

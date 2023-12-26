import { appConfig } from "../config/config.js";
import { send } from "../services/emailService.js";

import { createToken } from "../services/jwtService.js";
import { getOrganizationById } from "../services/organizationService.js";
import { getByEmail, savePasswordToken } from "../services/personService.js";
import { ERRORS } from "../utils/errors.js";

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
  const person = await getByEmail(email);
  if (!person) {
    return next(ERRORS.UserNotFound);
  }

  const token = createToken({
    id: person.person_id,
  });
  const url = `${appConfig.url}/reset/${token}`;
  const mailOptions = {
    to: email,
    subject: "Recuperar contraseña",
    text: `Para recuperar tu contraseña haz click en el siguiente link: ${url}`,
  };
  try {
    await send(mailOptions, appConfig.email);
    await savePasswordToken(person, token);
    return res.success(200, token);
  } catch (error) {
    next(error);
  }
};

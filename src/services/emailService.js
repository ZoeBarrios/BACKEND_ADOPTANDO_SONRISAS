import { transporter } from "../config/config.js";
export const send = async (objToSend, emailFrom) => {
  const mailOptions = {
    from: emailFrom,
    to: objToSend.to,
    subject: objToSend.subject,
    text: objToSend.text,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el email:", error);
    throw new Error("No se pudo enviar el email");
  }

  return true;
};

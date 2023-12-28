import { transporter } from "../config/config.js";
import fs from "fs";
export const send = async (objToSend, emailFrom, infoPDF = null) => {
  let mailOptions = {
    from: emailFrom,
    to: objToSend.to,
    subject: objToSend.subject,
    text: objToSend.text,
  };
  if (infoPDF) {
    mailOptions.attachments = [
      {
        filename: `${infoPDF.name}.pdf`,
        path: infoPDF.path,
      },
    ];
  }

  try {
    transporter.sendMail(mailOptions).then((info) => {
      if (infoPDF) {
        fs.unlink(infoPDF.path, (err) => {
          if (err) {
            console.error("Error al eliminar el archivo:", err);
            return;
          }
          console.log("Archivo PDF eliminado correctamente.");
        });
      }
    });
  } catch (error) {
    console.error("Error al enviar el email:", error);
    throw new Error("No se pudo enviar el email");
  }

  return true;
};

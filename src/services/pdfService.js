import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { SEX_TRANSLATE, SIZE_TRANSLATE } from "../utils/translate.js";

export const createPDF = async (adoption) => {
  const { animal, organization, person } = adoption;
  const pdfName = `${animal.name}.pdf`;

  const pdfFolderPath = path.join(process.cwd(), "src", "pdf");
  const pdfPath = path.join(pdfFolderPath, pdfName);

  if (!fs.existsSync(pdfFolderPath)) {
    fs.mkdirSync(pdfFolderPath, { recursive: true });
  }

  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(pdfPath));

  doc.text("Información de la petición de adopción:", {
    align: "center",
    underline: true,
    fontSize: 18,
  });

  doc.moveDown();

  doc.text("Información de mascota", {
    fontSize: 16,
    underline: true,
  });

  doc.text(`Animal: ${animal.name}`);
  doc.text(`Sexo del animal: ${SEX_TRANSLATE[animal.sex]}`);
  doc.text(`Tamaño del animal: ${SIZE_TRANSLATE[animal.size]}`);
  doc.text(`Fecha de nacimiento: ${animal.birthdate}`);
  doc.text(`Información de la organización: ${organization.name}`);
  doc.text(`Contacto: ${organization.phone_number || organization.email}`);
  doc.text(`Persona adoptante: ${person.name}`);

  doc.end();

  return {
    name: pdfName,
    path: pdfPath,
  };
};

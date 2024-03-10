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

  doc.text("Información de la mascota", {
    fontSize: 16,
    underline: true,
  });

  doc.text(`Animal: ${animal.name}`);
  doc.text(`Sexo: ${SEX_TRANSLATE[animal.sex]}`);
  doc.text(`Tamaño: ${SIZE_TRANSLATE[animal.size]}`);
  doc.text(`Fecha de nacimiento: ${animal.birthdate}`);

  doc.moveDown(2);

  doc.text("Información de la organización", {
    align: "center",
    underline: true,
    fontSize: 18,
  });

  doc.text(`Nombre: ${organization.name}`);
  doc.text(`Contacto: ${organization.phone_number || organization.email}`);

  doc.moveDown(2);

  doc.text("Información del adoptante", {
    align: "center",
    underline: true,
    fontSize: 18,
  });

  doc.text(`Nombre: ${person.name}`);
  doc.text(`Teléfono: ${person.phone_number || "N/A"}`);
  doc.text(`Email: ${person.email || "N/A"}`);

  doc.end();

  return {
    name: pdfName,
    path: pdfPath,
  };
};

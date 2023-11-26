import express from "express";
const router = express.Router();
import { registerCase } from "../../controllers/casesController.js";
import multer from "multer";
export const multipleUpload = multer().array("images", 3);
/**
 * @swagger
 * /api/cases:
 *   post:
 *     summary: registrar un caso
 *     tags: [Cases]
 *     description: registrar un caso en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               animal_id:
 *                 type: integer
 *                 description: id del animal
 *               description:
 *                 type: string
 *                 description: descripción del caso
 *               title:
 *                 type: string
 *                 description: título del caso
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Imágenes del caso
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 *     security: []
 */

router.post("/", multipleUpload, registerCase);

export default router;

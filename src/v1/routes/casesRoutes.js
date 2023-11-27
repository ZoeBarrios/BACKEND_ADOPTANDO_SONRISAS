import express from "express";
const router = express.Router();
import {
  getCase,
  getCases,
  registerCase,
} from "../../controllers/casesController.js";
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
 */

router.post("/", multipleUpload, registerCase);

/**
 * @swagger
 * /api/cases/all:
 *   get:
 *     summary: Obtener todos los casos
 *     tags: [Cases]
 *     description: Obtener todos los casos
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *     security: []
 */

router.get("/all", getCases);

/**
 * @swagger
 * /api/cases/{id}:
 *   get:
 *     summary: Obtener un caso por id
 *     tags: [Cases]
 *     description: Obtener un caso por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del caso
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       404:
 *         description: No encontrado
 *       security: []
 */

router.get("/:id", getCase);

export default router;

import express from "express";
import { createAnimal } from "../../controllers/animalsController.js";
const router = express.Router();

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: registrar animal
 *     tags: [Animals]
 *     description: registrar animal en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: nombre del animal
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: imagen del animal (archivo)
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.post("/", createAnimal);
router.get("/", (req, res) => {});

export default router;

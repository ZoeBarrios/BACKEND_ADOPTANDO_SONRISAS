import express from "express";
import { getAll, registerAnimal } from "../../controllers/animalsController.js";
import authMiddleware from "../../middlewares/auth.js";
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
 *               name:
 *                 type: string
 *                 description: nombre del animal
 *               description:
 *                 type: string
 *                 description: descripción del animal
 *               sex:
 *                 type: char(1)
 *                 description: sexo del animal
 *               age:
 *                 type: integer
 *                 description: edad del animal(dias)
 *               size:
 *                 type: string
 *                 description: tamaño del animal
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: imagen del animal (archivo)
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.post("/", authMiddleware, registerAnimal);

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Obtener todos los animales
 *     tags: [Animals]
 *     description: Obtener todos los animales de la base de datos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página para la paginación
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *     security: []
 */

router.get("/", getAll);

export default router;

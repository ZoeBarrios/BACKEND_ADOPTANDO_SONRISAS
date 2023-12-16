import express from "express";
import {
  deleteAnimalById,
  getFiltered,
  getAllAdmin,
  getById,
  registerAnimal,
  update,
} from "../../controllers/animalsController.js";
import authMiddleware from "../../middlewares/auth.js";
import multer from "multer";
const router = express.Router();
export const singleUploAD = multer().single("image");

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
 *               birthdate:
 *                 type: date
 *                 description: fecha de nacimiento del animal
 *               size:
 *                 type: string
 *                 description: tamaño del animal
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: imagen del animal (archivo)
 *               organization_id:
 *                 type: integer
 *                 description: id de la organización a la que pertenece el animal
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.post("/", authMiddleware, singleUploAD, registerAnimal);
/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Obtener todos los animales
 *     tags:
 *       - Animals
 *     description: Obtener todos los animales de la base de datos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *         required: false
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 12
 *         required: false
 *         description: Número de elementos por página
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Género del animal
 *       - in: query
 *         name: age
 *         schema:
 *           type: string
 *         description: Edad del animal
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         description: Tamaño del animal
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *     security: []
 */

router.get("/", getFiltered);

/**
 * @swagger
 * /api/animals/animal/{id}:
 *   get:
 *     summary: Obtener un animal por su id
 *     tags: [Animals]
 *     description: Obtener un animal por su id de la base de datos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id del animal
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       404:
 *         description: Animal no encontrado
 *     security: []
 */

router.get("/animal/:id", getById);
/**
 * @swagger
 * /api/animals/admin/{page}:
 *   get:
 *     summary: Obtener todos los animales para el admin
 *     tags: [Animals]
 *     description: Obtener todos los animales para el admin de la base de datos
 *     parameters:
 *       - in: path
 *         name: page
 *         default: 1
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página para la paginación
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *     security: []
 */

router.get("/admin/:page", authMiddleware, getAllAdmin);

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     summary: Eliminar un animal
 *     tags: [Animals]
 *     description: Eliminar un animal de la base de datos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id del animal
 *     responses:
 *       204:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 */

router.delete("/:id", authMiddleware, deleteAnimalById);
/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     summary: actualizar animal
 *     tags: [Animals]
 *     description: actualizar animal en la base de datos
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
router.put("/:id", authMiddleware, singleUploAD, update);

export default router;

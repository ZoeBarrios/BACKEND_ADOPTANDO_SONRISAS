import express from "express";
import {
  getUser,
  registerUser,
  updateOneUser,
} from "../../controllers/usersController.js";
const router = express.Router();
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un usuario admin o moderador
 *     tags: [Users]
 *     description: Crea un usuario admin o moderador
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: ["Admin", "Moderator"]
 *         description: rol del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: nombre del usuario
 *                 required: true
 *               surname:
 *                 type: string
 *                 description: apellido del usuario
 *                 required: true
 *               organization_id:
 *                 type: integer
 *                 description: id de la organización
 *                 required: true
 *               email:
 *                 type: string
 *                 description: email del usuario
 *                 required: true
 *               password:
 *                 type: string
 *                 description: contraseña del usuario
 *                 required: true
 *               phone:
 *                 type: string
 *                 description: teléfono del usuario
 *                 required: true
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 *
 */

router.post("/", registerUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Users]
 *     description: Actualiza un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: nombre del usuario
 *               surname:
 *                 type: string
 *                 description: apellido del usuario
 *               phone:
 *                 type: string
 *                 description: teléfono del usuario
 *               email:
 *                 type: string
 *                 description: email del usuario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */

router.put("/:id", updateOneUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por id
 *     tags: [Users]
 *     description: Obtiene un usuario por id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id del usuario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/:id", getUser);

export default router;

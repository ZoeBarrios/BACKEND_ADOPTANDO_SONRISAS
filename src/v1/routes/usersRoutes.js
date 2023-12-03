import express from "express";
import {
  getAdminsByOrganization,
  getModeratorsByOrganization,
  registerUser,
} from "../../controllers/usersController.js";
const router = express.Router();
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un usuario con rol de administrador
 *     tags: [Users]
 *     description: Crea un usuario con rol de administrador
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
 *               surname:
 *                 type: string
 *                 description: apellido del usuario
 *               organization_id:
 *                 type: integer
 *                 description: id de la organización
 *               email:
 *                 type: string
 *                 description: email del usuario
 *               password:
 *                 type: string
 *                 description: contraseña del usuario
 *               phone:
 *                 type: string
 *                 description: teléfono del usuario
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.post("/", registerUser);
/**
 * @swagger
 * /api/users/admins/{organization_id}:
 *   get:
 *     summary: Obtiene los administradores de una organización
 *     tags: [Users]
 *     description: Obtiene los administradores de una organización
 *     parameters:
 *       - in: path
 *         name: organization_id
 *         schema:
 *           type: integer
 *         description: id de la organización
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/admins/:organization_id", getAdminsByOrganization);

/**
 * @swagger
 * /api/users/moderators/{organization_id}:
 *   get:
 *     summary: Obtiene los moderadores de una organización
 *     tags: [Users]
 *     description: Obtiene los moderadores de una organización
 *     parameters:
 *       - in: path
 *         name: organization_id
 *         schema:
 *           type: integer
 *         description: id de la organización
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */
router.get("/moderators/:organization_id", getModeratorsByOrganization);

export default router;

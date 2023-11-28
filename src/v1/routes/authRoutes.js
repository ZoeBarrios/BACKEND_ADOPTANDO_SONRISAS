import express from "express";
import { login, register } from "../../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     description: Login de usuario
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
 *               password:
 *                 type: string
 *                 description: contraseña del usuario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *     security: []
 */

router.post("/login", login);
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar una organización
 *     tags: [Auth]
 *     description: Registrar una organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: nombre de la organización
 *                 required: true
 *               description:
 *                 type: string
 *                 description: descripción de la organización
 *                 required: true
 *               phone:
 *                 type: string
 *                 description: teléfono de la organización
 *               email:
 *                 type: string
 *                 description: email de la organización
 *                 required: true
 *               instagram_link:
 *                 type: string
 *                 description: link de instagram de la organización
 *               facebook_link:
 *                 type: string
 *                 description: link de facebook de la organización
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *     security: []
 */

router.post("/register", register);

export default router;

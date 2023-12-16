import express from "express";
import { login, register } from "../../controllers/authController.js";
import { registerUser } from "../../controllers/personController.js";

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
 * /api/auth/register/organizacion:
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

router.post("/register/organization", register);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [Auth]
 *     description: Registrar un usuario
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum:
 *             - User
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
 *     security: []
 */

router.post("/register", registerUser);

export default router;

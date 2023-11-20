import express from "express";
import { login, logout } from "../../controllers/authController.js";
const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     description: Login de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: nombre del usuario
 *               contraseña:
 *                 type: string
 *                 description: contraseña del usuario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.post("/login", login);

router.post("/logout", logout);

export default router;

import express from "express";
import {
  forgotPassword,
  sendEmail,
} from "../../controllers/emailController.js";

const router = express.Router();

/**
 * @swagger
 * /api/email/send/{id}:
 *   post:
 *     summary: Enviar un email
 *     tags: [Email]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id de la organización
 *       - in: body
 *         name: EmailData
 *         description: Datos del email
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             destinatario:
 *               type: string
 *               description: Email del destinatario
 *             asunto:
 *               type: string
 *               description: Asunto del email
 *             cuerpo:
 *               type: string
 *               description: Cuerpo del email
 *     responses:
 *       200:
 *         description: Email enviado exitosamente
 *       400:
 *         description: Error al enviar el email
 */

router.post("/send/:id", sendEmail);

/**
 * @swagger
 * /api/email/change-password:
 *   post:
 *     summary: Enviar un email para recuperar la contraseña
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *     responses:
 *       200:
 *         description: Email enviado exitosamente
 *       400:
 *         description: Error al enviar el email
 *     security: []
 */

router.post("/change-password", forgotPassword);

export default router;

import { registerDonation } from "../../controllers/donationsController.js";
import authMiddleware from "../../middlewares/auth.js";
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/donations:
 *   post:
 *     summary: Registro de donaciones
 *     tags: [Donations]
 *     description: Registro de donaciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: integer
 *                 description: id de la organización
 *                 required: true
 *               total_amount:
 *                 type: string
 *                 format: decimal
 *                 description: Monto total de la donación
 *                 required: true
 *               donator_name:
 *                 type: string
 *                 description: Nombre del donante
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *     security: []
 */

router.post("/", registerDonation);

export default router;

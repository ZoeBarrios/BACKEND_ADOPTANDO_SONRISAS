import {
  getAllDonations,
  getDonationByOrganization,
  getDonationsInMonth,
  getDonationsInYear,
  registerDonation,
} from "../../controllers/donationsController.js";
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

/**
 * @swagger
 * /api/donations:
 *   get:
 *     summary: Obtener todas las donaciones
 *     tags: [Donations]
 *     description: Obtener todas las donaciones
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */
router.get("/", authMiddleware, getAllDonations);

/**
 * @swagger
 * /api/donations/{id}:
 *   get:
 *     summary: Obtener todas las donaciones de una organización
 *     tags: [Donations]
 *     description: Obtener todas las donaciones de una organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id de la organización
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/:id", authMiddleware, getDonationByOrganization);

/**
 * @swagger
 * /api/donations/{id}/year/{year}:
 *   get:
 *     summary: Obtener todas las donaciones de una organización en un año
 *     tags: [Donations]
 *     description: Obtener todas las donaciones de una organización en un año
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id de la organización
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: año de la donación
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/:id/year/:year", authMiddleware, getDonationsInYear);

/**
 * @swagger
 * /api/donations/{id}/month/{month}:
 *   get:
 *     summary: Obtener todas las donaciones de una organización en un mes
 *     tags: [Donations]
 *     description: Obtener todas las donaciones de una organización en un mes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id de la organización
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: mes de la donación
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */
router.get("/:id/month/:month", authMiddleware, getDonationsInMonth);

export default router;

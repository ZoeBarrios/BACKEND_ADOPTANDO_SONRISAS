import express from "express";
import {
  acceptOrganization,
  getActive,
  getOrganization,
  getPending,
} from "../../controllers/organizationsController.js";
const router = express.Router();

/**
 * @swagger
 * /api/organizations/{id}:
 *   put:
 *     summary: Aceptar una organización
 *     tags: [Organizations]
 *     description: Aceptar una organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.put("/:id", acceptOrganization);

/**
 * @swagger
 * /api/organizations/pending:
 *   get:
 *     summary: Obtener organizaciones pendientes
 *     tags: [Organizations]
 *     description: Obtener organizaciones pendientes
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */
router.get("/pending", getPending);

/**
 * @swagger
 * /api/organizations/active:
 *   get:
 *     summary: Obtener organizaciones activas
 *     tags: [Organizations]
 *     description: Obtener organizaciones activas
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/active", getActive);

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     summary: Obtener una organización
 *     tags: [Organizations]
 *     description: Obtener una organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *     security: []
 */
router.get("/:id", getOrganization);

export default router;

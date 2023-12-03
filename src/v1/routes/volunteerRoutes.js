import {
  deleteOrganizationFromVolunteers,
  getOrganizationByVolunteerId,
} from "../../controllers/volunteerController.js";
import express from "express";
const router = express.Router();
/**
 * @swagger
 * /api/volunteers/{id}:
 *   get:
 *     summary: Obtener una organización por voluntario
 *     tags: [Volunteers]
 *     description: Obtener una organización por voluntario
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
router.get("/volunteers/:id", getOrganizationByVolunteerId);

/**
 * @swagger
 * /api/volunteers:
 *   delete:
 *     summary: Eliminar una organización de voluntarios
 *     tags:
 *       - Volunteers
 *     description: Eliminar una organización de voluntarios
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: string
 *                 description: ID de la organización
 *               volunteer_id:
 *                 type: string
 *                 description: ID del voluntario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.delete("/volunteers", deleteOrganizationFromVolunteers);

export default router;

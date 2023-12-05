import {
  creatOrganizationVolunteer,
  deleteOrganizationFromVolunteers,
  getAllOrganizationsByVolunteer,
} from "../../controllers/volunteerController.js";
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/volunteers/all/{id}:
 *   get:
 *     summary: Obtener todas las organizaciones de un voluntario
 *     tags: [Volunteers]
 *     description: Obtener todas las organizaciones de un voluntario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del voluntario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 */

router.get("/all/:id", getAllOrganizationsByVolunteer);

/**
 * @swagger
 * /api/volunteers:
 *   delete:
 *     summary: Eliminar un voluntariado de un usuario
 *     tags:
 *       - Volunteers
 *     description: Eliminar un voluntariado de un usuario
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: integer
 *                 description: ID de la organización
 *               volunteer_id:
 *                 type: integer
 *                 description: ID del voluntario
 *     responses:
 *       204:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 */

router.delete("/", deleteOrganizationFromVolunteers);

/**
 * @swagger
 * /api/volunteers:
 *   post:
 *     summary: Registrar aplicacion de un usuario a voluntariado
 *     tags:
 *       - Volunteers
 *     description: Registrar aplicacion de un usuario a voluntariado
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: integer
 *                 description: ID de la organización
 *               user_id:
 *                 type: integer
 *                 description: ID del voluntario
 *               activity:
 *                 type: string
 *                 description: Actividad del voluntario
 *                 enum: ["Transitar","Donaciones de alimentos"]
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 */

router.post("/", creatOrganizationVolunteer);

export default router;

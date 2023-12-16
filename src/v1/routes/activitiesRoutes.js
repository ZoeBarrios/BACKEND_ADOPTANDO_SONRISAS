import { Router } from "express";
import {
  getActivity,
  getAllActivities,
} from "../../controllers/activitiesController.js";
const router = Router();

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Obtiene todas las actividades
 *     tags: [Activities]
 *     description: Obtiene todas las actividades
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       404:
 *         description: Actividades no encontradas
 *       401:
 *         description: No autorizado
 */

router.get("/", getAllActivities);

/**
 * @swagger
 * /api/activities/{id}:
 *   get:
 *     summary: Obtiene una actividad por id
 *     tags: [Activities]
 *     description: Obtiene una actividad por id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id de la actividad
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       404:
 *         description: Actividad no encontrada
 *       401:
 *         description: No autorizado
 */

router.get("/:id", getActivity);

export default router;

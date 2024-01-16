import express from "express";
import {
  getRatingsByPerson,
  registerRating,
} from "../../controllers/ratingController.js";
import checkRoles from "../../middlewares/checkRolesMiddleware.js";
import { ROLES } from "../../utils/constants.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     tags:
 *       - Ratings
 *     summary: Registrar una calificación
 *     description: Registra una calificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               person_id:
 *                 type: integer
 *               animal_id:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *               rater_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Calificación registrada
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 */

router.post("/", checkRoles([ROLES.ADMIN, ROLES.MODERATOR]), registerRating);

/**
 * @swagger
 * /api/ratings/{person_id}:
 *   get:
 *     tags:
 *       - Ratings
 *     summary: Obtener calificaciones por persona
 *     description: Obtiene las calificaciones de una persona
 *     parameters:
 *       - name: person_id
 *         in: path
 *         description: ID de la persona
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Calificaciones obtenidas
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autorizado
 */

router.get(
  "/:person_id",
  authMiddleware,
  checkRoles([ROLES.ADMIN, ROLES.MODERATOR, ROLES.SUPERADMIN]),
  getRatingsByPerson
);

export default router;

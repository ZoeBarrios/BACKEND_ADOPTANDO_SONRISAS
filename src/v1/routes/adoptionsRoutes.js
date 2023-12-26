import express from "express";
const router = express.Router();
import {
  registerAdoption,
  getAdoptionsByUserId,
  getAdoptionsByOrganizationId,
  accept,
  cancel,
} from "../../controllers/adoptionsController.js";
import checkRoles from "../../middlewares/checkRolesMiddleware.js";
import { ROLES } from "../../utils/constants.js";

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Registrar una adopción
 *     tags:
 *       - Adoptions
 *     description: Registrar una adopción en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animal_id:
 *                 type: integer
 *                 description: Id del animal
 *                 required: true
 *               person_id:
 *                 type: integer
 *                 description: Id del usuario
 *                 required: true
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos
 *
 */

router.post("/", checkRoles([ROLES.USER]), registerAdoption);

/**
 * @swagger
 * /api/adoptions/organization/{organizationId}:
 *   get:
 *     summary: Obtener todas las adopciones de una organizacion
 *     tags:
 *       - Adoptions
 *     description: Obtener todas las adopciones de una organizacion
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos
 */

router.get(
  "/organization/:organizationId",
  checkRoles([ROLES.ADMIN, ROLES.MODERATOR]),
  getAdoptionsByOrganizationId
);

/**
 * @swagger
 * /api/adoptions/person/{personId}:
 *   get:
 *     summary: Obtener todas las adopciones de un usuario
 *     tags:
 *       - Adoptions
 *     description: Obtener todas las adopciones de un usuario de la base de datos
 *     parameters:
 *       - in: path
 *         name: personId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 */

router.get("/person/:personId", getAdoptionsByUserId);

/**
 * @swagger
 * /api/adoptions/accept:
 *   put:
 *     summary: Aceptar una adopción
 *     tags:
 *       - Adoptions
 *     description: Aceptar una adopción de la base de datos
 *     parameters:
 *       - in: query
 *         name: person_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: animal_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos
 */

router.put("/accept", checkRoles([ROLES.ADMIN, ROLES.MODERATOR]), accept);

/**
 * @swagger
 * /api/adoptions/cancel:
 *   put:
 *     summary: Cancelar una adopción
 *     tags:
 *       - Adoptions
 *     description: Cancelar una adopción de la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animal_id:
 *                 type: integer
 *                 description: Id del animal
 *               person_id:
 *                 type: integer
 *                 description: Id del usuario
 *             required:
 *               - animal_id
 *               - person_id
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 */

router.put("/cancel", cancel);

export default router;

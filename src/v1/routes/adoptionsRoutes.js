import express from "express";
const router = express.Router();
import {
  registerAdoption,
  getAllAdoptions,
  getOneAdoption,
  getAdoptionsByMonth,
  getAdoptionsByYear,
} from "../../controllers/adoptionsController.js";

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
 *               organization_id:
 *                 type: integer
 *                 description: id de la organizacion que realizo la adopción
 *                 required: true
 *               animal_id:
 *                 type: integer
 *                 description: id del animal
 *                 required: true
 *               responsable_name:
 *                 type: string
 *                 description: nombre del responsable
 *                 required: true
 *               responsable_phone:
 *                 type: string
 *                 description: telefono del responsable
 *                 required: true
 *               responsable_address:
 *                 type: string
 *                 description: direccion del responsable
 *                 required: false
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 */

router.post("/", registerAdoption);

/**
 * @swagger
 * /api/adoptions/{organizationId}:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags:
 *       - Adoptions
 *     description: Obtener todas las adopciones de la base de datos
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */

router.get("/:organizationId", getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{organizationId}/{animalId}:
 *   get:
 *     summary: Obtener una adopción
 *     tags:
 *       - Adoptions
 *     description: Obtener una adopción de la base de datos
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/:organizationId/:animalId", getOneAdoption);

/**
 * @swagger
 * /api/adoptions/{organizationId}/month/{num_month}:
 *   get:
 *     summary: Obtener todas las adopciones de un mes
 *     tags:
 *       - Adoptions
 *     description: Obtener todas las adopciones de un mes
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: num_month
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/:organizationId/month/:num_month", getAdoptionsByMonth);

/**
 * @swagger
 * /api/adoptions/{organizationId}/year/{year}:
 *   get:
 *     summary: Obtener todas las adopciones de un año
 *     tags:
 *       - Adoptions
 *     description: Obtener todas las adopciones de un año
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/:organizationId/year/:year", getAdoptionsByYear);

export default router;

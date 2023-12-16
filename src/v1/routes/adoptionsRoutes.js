import express from "express";
const router = express.Router();
import {
  registerAdoption,
  getAllAdoptions,
  getOneAdoption,
  getAdoptionsByUserId,
  getAdoptionsByOrganizationId,
  accept,
  cancel,
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
 */

router.post("/", registerAdoption);

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
 */

router.get("/organization/:organizationId", getAdoptionsByOrganizationId);

/**
 * @swagger
 * /api/adoptions/one/{userId}/{animalId}:
 *   get:
 *     summary: Obtener una adopción
 *     tags:
 *       - Adoptions
 *     description: Obtener una adopción de la base de datos
 *     parameters:
 *       - in: path
 *         name: userId
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

router.get("/one/:organizationId/:animalId", getOneAdoption);

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
 */

router.get("/person/:personId", getAdoptionsByUserId);

/**
 * @swagger
 * /api/adoptions/accept/{userId}/{animalId}
 *   put:
 *     summary: Aceptar una adopción
 *     tags:
 *       - Adoptions
 *     description: Aceptar una adopción de la base de datos
 *     parameters:
 *       - in: path
 *         name: userId
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

router.put("/accept/:userId/:animalId", accept);

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
 *           example:
 *             animal_id: 123
 *             person_id: 456
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.put("/cancel", cancel);

export default router;

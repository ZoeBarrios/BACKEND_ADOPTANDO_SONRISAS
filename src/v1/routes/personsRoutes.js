import express from "express";
import {
  deletePersonFromOrganization,
  deleteUserAccount,
  getApplysByPersonId,
  getPersons_OrganizationsByOrganization,
  getUser,
  joinPersonToOrganization,
  registerUser,
  updateOneUser,
} from "../../controllers/personController.js";
import checkRoles from "../../middlewares/checkRolesMiddleware.js";
import { ROLES } from "../../utils/constants.js";
const router = express.Router();
/**
 * @swagger
 * /api/persons:
 *   post:
 *     summary: Crea un usuario admin o moderador
 *     tags: [Persons]
 *     description: Crea un usuario admin o moderador
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: ["Admin", "Moderator"]
 *         description: rol del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: nombre del usuario
 *                 required: true
 *               surname:
 *                 type: string
 *                 description: apellido del usuario
 *                 required: true
 *               organization_id:
 *                 type: integer
 *                 description: id de la organización
 *                 required: true
 *               email:
 *                 type: string
 *                 description: email del usuario
 *                 required: true
 *               password:
 *                 type: string
 *                 description: contraseña del usuario
 *                 required: true
 *               phone:
 *                 type: string
 *                 description: teléfono del usuario
 *                 required: true
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No permitido
 *
 */

router.post("/", checkRoles([ROLES.SUPERADMIN, ROLES.ADMIN]), registerUser);

/**
 * @swagger
 * /api/persons/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Persons]
 *     description: Actualiza un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: nombre del usuario
 *               surname:
 *                 type: string
 *                 description: apellido del usuario
 *               phone:
 *                 type: string
 *                 description: teléfono del usuario
 *               email:
 *                 type: string
 *                 description: email del usuario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */

router.put("/:id", updateOneUser);

/**
 * @swagger
 * /api/persons/{id}:
 *   get:
 *     summary: Obtiene un usuario por id
 *     tags: [Persons]
 *     description: Obtiene un usuario por id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id del usuario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/:id", getUser);

/**
 * @swagger
 * /api/persons/apply:
 *   post:
 *     summary: Aplica a una organización
 *     tags: [Persons]
 *     description: Aplica a una organización
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
 *               person_id:
 *                 type: integer
 *                 description: id del usuario
 *                 required: true
 *               activity_id:
 *                 type: integer
 *                 description: id de la actividad
 *                 required: true
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */

router.post("/apply", joinPersonToOrganization);
/**
 * @swagger
 * /api/persons/apply/{id}:
 *   get:
 *     summary: Obtiene las aplicaciones de un usuario
 *     tags: [Persons]
 *     description: Obtiene las aplicaciones de un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id del usuario
 *       - in: query
 *         name: activity_id
 *         schema:
 *           type: integer
 *         description: id de la actividad
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/apply/:id", getApplysByPersonId);

/**
 * @swagger
 * /api/persons/apply:
 *   delete:
 *     summary: Elimina una aplicación
 *     tags: [Persons]
 *     description: Elimina una aplicación
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
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
 *               person_id:
 *                 type: integer
 *                 description: id del usuario
 *                 required: true
 */

router.delete("/apply", deletePersonFromOrganization);

/**
 * @swagger
 * /api/persons/organization/{id}:
 *   get:
 *     summary: Obtiene los usuarios de una organización
 *     tags: [Persons]
 *     description: Obtiene los usuarios de una organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id de la organización
 *       - in: query
 *         name: activity_id
 *         schema:
 *           type: integer
 *         description: id de la actividad
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get("/organization/:id", getPersons_OrganizationsByOrganization);

/**
 * @swagger
 * /api/persons/{id}:
 *   delete:
 *     summary: Elimina una cuenta de usuario
 *     tags: [Persons]
 *     description: Elimina una cuenta de usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id del usuario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete("/:id", deleteUserAccount);

export default router;

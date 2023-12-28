import express from "express";
import {
  acceptOrganization,
  deleteOrganization,
  deletePersonFromOrganization,
  getActive,
  getAdminsByOrganization,
  getModeratorsByOrganization,
  getOrganization,
  getOrganizationByPerson,
  getOrganizationsNotApllied,
  getPending,
  updatOneOrganization,
} from "../../controllers/organizationsController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import checkRoles from "../../middlewares/checkRolesMiddleware.js";
import { ROLES } from "../../utils/constants.js";
const router = express.Router();

/**
 * @swagger
 * /api/organizations/accept/{id}:
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
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para realizar esta acción
 */

router.put(
  "/accept/:id",
  authMiddleware,
  checkRoles([ROLES.SUPERADMIN]),
  acceptOrganization
);

/**
 * @swagger
 * /api/organizations/admins/{organization_id}:
 *   get:
 *     summary: Obtiene los administradores de una organización
 *     tags: [Organizations]
 *     description: Obtiene los administradores de una organización
 *     parameters:
 *       - in: path
 *         name: organization_id
 *         schema:
 *           type: integer
 *         description: id de la organización
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para realizar esta acción
 */

router.get(
  "/admins/:organization_id",
  authMiddleware,
  checkRoles([ROLES.SUPERADMIN]),
  getAdminsByOrganization
);

/**
 * @swagger
 * /api/organizations/moderators/{organization_id}:
 *   get:
 *     summary: Obtiene los moderadores de una organización
 *     tags: [Organizations]
 *     description: Obtiene los moderadores de una organización
 *     parameters:
 *       - in: path
 *         name: organization_id
 *         schema:
 *           type: integer
 *         description: id de la organización
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para realizar esta acción
 */
router.get(
  "/moderators/:organization_id",
  authMiddleware,
  checkRoles([ROLES.ADMIN, ROLES.SUPERADMIN]),
  getModeratorsByOrganization
);

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
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para realizar esta acción
 */
router.get(
  "/pending",
  authMiddleware,
  checkRoles([ROLES.SUPERADMIN]),
  getPending
);

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
 *     security: []
 */

router.get("/active", getActive);

/**
 * @swagger
 * /api/organizations/active/user/{id}:
 *   get:
 *     summary: Obtener organizaciones activas de un usuario
 *     tags: [Organizations]
 *     description: Obtener organizaciones activas de un usuario
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
 *     security: []
 */

router.get("/active/user/:id", authMiddleware, getOrganizationsNotApllied);

/**
 * @swagger
 * /api/organizations/{id}:
 *   put:
 *     summary: Actualizar una organización
 *     tags: [Organizations]
 *     description: Actualizar una organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la organización
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               instagram_link:
 *                 type: string
 *               facebook_link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para realizar esta acción
 */
router.put(
  "/:id",
  authMiddleware,
  checkRoles([ROLES.ADMIN, ROLES.SUPERADMIN]),
  updatOneOrganization
);

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

/**
 * @swagger
 * /api/organizations/person/{id}:
 *   get:
 *     summary: Obtener organización de una persona moderador o admin
 *     tags: [Organizations]
 *     description: Obtener organización de una persona moderador o admin
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 */

router.get(
  "/person/:id",
  authMiddleware,
  checkRoles([ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPERADMIN]),
  getOrganizationByPerson
);

/**
 * @swagger
 * /api/organizations:
 *   delete:
 *     summary: Eliminar una persona de una organización
 *     tags: [Organizations]
 *     description: Eliminar una persona de una organización
 *     parameters:
 *       - in: query
 *         name: organization_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la organización
 *       - in: query
 *         name: person_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la persona
 *     responses:
 *       204:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 */

router.delete("/", authMiddleware, deletePersonFromOrganization);

/**
 * @swagger
 * /api/organizations/{id}:
 *   delete:
 *     summary: Eliminar una organización
 *     tags: [Organizations]
 *     description: Eliminar una organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la organización
 *     responses:
 *       204:
 *         description: Respuesta exitosa
 *       400:
 *         description: Error en la petición
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para realizar esta acción
 */

router.delete(
  "/:id",
  authMiddleware,
  checkRoles([ROLES.SUPERADMIN]),
  deleteOrganization
);
export default router;

import express from "express";
import {
  acceptOrganization,
  getActive,
  getAdminsByOrganization,
  getModeratorsByOrganization,
  getOrganization,
  getPending,
  updatOneOrganization,
} from "../../controllers/organizationsController.js";
import authMiddleware from "../../middlewares/auth.js";
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
 */

router.put("/accept/:id", authMiddleware, acceptOrganization);

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
 */

router.get("/admins/:organization_id", authMiddleware, getAdminsByOrganization);

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
 */
router.get(
  "/moderators/:organization_id",
  authMiddleware,
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
 */
router.get("/pending", authMiddleware, getPending);

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

router.get("/active", authMiddleware, getActive);

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
 */
router.put("/:id", authMiddleware, updatOneOrganization);

export default router;

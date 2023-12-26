import express from "express";
import {
  getFinancialInfoByOrganization,
  registerFinancialInfo,
  updateFinancialInfo,
} from "../../controllers/financialInfoController.js";
import authMiddleware from "../../middlewares/auth.js";
import checkRoles from "../../middlewares/checkRolesMiddleware.js";
import { ROLES } from "../../utils/constants.js";
const router = express.Router();

/**
 * @swagger
 * /api/financialInfo:
 *   post:
 *     tags:
 *       - Financial Info
 *     summary: Registra la información financiera de una organización
 *     description: Registra la información financiera de una organización
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: integer
 *               cbu:
 *                 type: string
 *               alias:
 *                 type: string
 *               mp_link:
 *                 type: string
 *             required:
 *               - organization_id
 *     responses:
 *       201:
 *         description: Información financiera registrada
 *       400:
 *         description: Error de validación
 */

router.post(
  "/",
  authMiddleware,
  checkRoles([ROLES.ADMIN]),
  registerFinancialInfo
);

/**
 * @swagger
 * /api/financialInfo/{organization_id}:
 *   get:
 *     tags:
 *       - Financial Info
 *     summary: Obtener la información financiera de una organización
 *     description: Obtener la información financiera de una organización
 *     parameters:
 *       - in: path
 *         name: organization_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Información financiera
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Información financiera no encontrada
 *     security: []
 */

router.get("/:organization_id", getFinancialInfoByOrganization);

/**
 * @swagger
 * /api/financialInfo/{id}:
 *   put:
 *     tags:
 *       - Financial Info
 *     summary: Actualizar la información financiera de una organización
 *     description: Actualizar la información financiera de una organización
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: integer
 *               cbu:
 *                 type: string
 *               alias:
 *                 type: string
 *               mp_link:
 *                 type: string
 *             required:
 *               - organization_id
 *     responses:
 *       200:
 *         description: Información financiera actualizada
 *       400:
 *         description: Error de validación
 */

router.put(
  "/:id",
  authMiddleware,
  checkRoles([ROLES.ADMIN]),
  updateFinancialInfo
);

export default router;

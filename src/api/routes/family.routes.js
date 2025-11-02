import { Router } from 'express';
import { createFamily, joinFamily, getFamilyDetails } from '../controllers/family.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createFamilySchema, joinFamilySchema } from '../validators/family.validator.js';

const router = Router();

// All family routes require authentication
router.use(verifyJWT);

/**
 * @swagger
 * /api/families/create:
 *   post:
 *     summary: Create a new family
 *     tags: [Family]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFamilyInput'
 *     responses:
 *       201:
 *         description: Family created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Family'
 */
router.post('/create', validate(createFamilySchema), createFamily);

/**
 * @swagger
 * /api/families/join:
 *   post:
 *     summary: Join an existing family
 *     tags: [Family]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JoinFamilyInput'
 *     responses:
 *       200:
 *         description: Joined family successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JoinFamilyResponse'
 */
router.post('/join', validate(joinFamilySchema), joinFamily);

/**
 * @swagger
 * /api/families/{familyId}:
 *   get:
 *     summary: Get the details of a specific family
 *     tags: [Family]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: familyId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Family details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FamilyDetails'
 */
router.get('/:familyId', getFamilyDetails);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateFamilyInput:
 *       type: object
 *       required:
 *         - family_name
 *       properties:
 *         family_name:
 *           type: string
 *         family_surname:
 *           type: string
 *         city:
 *           type: string
 *     Family:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         family_name:
 *           type: string
 *         family_surname:
 *           type: string
 *         city:
 *           type: string
 *         family_code:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     JoinFamilyInput:
 *       type: object
 *       required:
 *         - family_code
 *       properties:
 *         family_code:
 *           type: string
 *           minLength: 8
 *           maxLength: 8
 *     JoinFamilyResponse:
 *       type: object
 *       properties:
 *         familyId:
 *           type: string
 *           format: uuid
 *     FamilyDetails:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         family_name:
 *           type: string
 *         family_surname:
 *           type: string
 *         city:
 *           type: string
 *         family_code:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 */

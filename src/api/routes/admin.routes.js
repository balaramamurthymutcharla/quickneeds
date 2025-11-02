import { Router } from 'express';
import {
  loginSuperAdmin,
  getAdvertisements,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
} from '../controllers/admin.controller.js';
// import { verifySuperAdminJWT } from '../middlewares/adminAuth.middleware.js'; // A separate auth middleware for admins is recommended

const router = Router();

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Log in a super admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLoginInput'
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminLoginResponse'
 *       401:
 *         description: Unauthorized
 */
router.post('/login', loginSuperAdmin);

// The following routes should be protected by an admin-specific auth middleware
// router.use(verifySuperAdminJWT);

/**
 * @swagger
 * /api/admin/advertisements:
 *   get:
 *     summary: Get all advertisements
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of advertisements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advertisement'
 *   post:
 *     summary: Create a new advertisement
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdvertisementInput'
 *     responses:
 *       201:
 *         description: Advertisement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 */
router.route('/advertisements').get(getAdvertisements).post(createAdvertisement);

/**
 * @swagger
 * /api/admin/advertisements/{adId}:
 *   put:
 *     summary: Update an advertisement
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdvertisementInput'
 *     responses:
 *       200:
 *         description: Advertisement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *   delete:
 *     summary: Delete an advertisement
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Advertisement deleted successfully
 */
router.route('/advertisements/:adId').put(updateAdvertisement).delete(deleteAdvertisement);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminLoginInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *     AdminLoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *     Advertisement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         image_url:
 *           type: string
 *         target_url:
 *           type: string
 *         display_locations:
 *           type: array
 *           items:
 *             type: string
 *         is_active:
 *           type: boolean
 *     AdvertisementInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         image_url:
 *           type: string
 *         target_url:
 *           type: string
 *         display_locations:
 *           type: array
 *           items:
 *             type: string
 *         is_active:
 *           type: boolean
 */

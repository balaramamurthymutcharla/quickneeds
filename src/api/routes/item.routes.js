import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  addRoom,
  getRooms,
  addItemToRoom,
  getItemsInRoom,
  updateItem,
} from '../controllers/item.controller.js';

const router = Router();

// All item/room routes will be protected
router.use(verifyJWT);

/**
 * @swagger
 * /api/items/rooms:
 *   post:
 *     summary: Add a new room
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddRoomInput'
 *     responses:
 *       201:
 *         description: Room added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *   get:
 *     summary: Get all rooms for the family
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: family_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A list of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
router.route('/rooms').post(addRoom).get(getRooms);

/**
 * @swagger
 * /api/items/rooms/{roomId}/items:
 *   post:
 *     summary: Add a new item to a room
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddItemInput'
 *     responses:
 *       201:
 *         description: Item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *   get:
 *     summary: Get all items in a room
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.route('/rooms/:roomId/items').post(addItemToRoom).get(getItemsInRoom);

/**
 * @swagger
 * /api/items/{itemId}:
 *   put:
 *     summary: Update an item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateItemInput'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
router.route('/:itemId').put(updateItem);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     AddRoomInput:
 *       type: object
 *       required:
 *         - room_name
 *         - room_icon
 *         - family_id
 *       properties:
 *         room_name:
 *           type: string
 *         room_icon:
 *           type: string
 *         family_id:
 *           type: string
 *           format: uuid
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         family_id:
 *           type: string
 *           format: uuid
 *         room_name:
 *           type: string
 *         room_icon:
 *           type: string
 *         is_custom:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *     AddItemInput:
 *       type: object
 *       required:
 *         - item_name
 *         - quantity
 *         - cost
 *       properties:
 *         item_name:
 *           type: string
 *         quantity:
 *           type: integer
 *         cost:
 *           type: number
 *           format: decimal
 *     UpdateItemInput:
 *       type: object
 *       properties:
 *         item_name:
 *           type: string
 *         status:
 *           type: string
 *           enum: [NEEDED, IN_CART, PURCHASED]
 *         quantity:
 *           type: integer
 *         cost:
 *           type: number
 *           format: decimal
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         room_id:
 *           type: string
 *           format: uuid
 *         item_name:
 *           type: string
 *         status:
 *           type: string
 *           enum: [NEEDED, IN_CART, PURCHASED]
 *         added_by_user_id:
 *           type: string
 *           format: uuid
 *         purchased_by_user_id:
 *           type: string
 *           format: uuid
 *         quantity:
 *           type: integer
 *         cost:
 *           type: number
 *           format: decimal
 *         last_purchased_at:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

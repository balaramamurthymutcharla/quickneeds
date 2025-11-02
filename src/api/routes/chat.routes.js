import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  getConversations,
  startConversation,
  getMessagesForConversation,
  sendMessage,
} from '../controllers/chat.controller.js';

const router = Router();

// All chat routes are protected
router.use(verifyJWT);

/**
 * @swagger
 * /api/chat/conversations:
 *   get:
 *     summary: Get all conversations for the current user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 *   post:
 *     summary: Start a new conversation
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StartConversationInput'
 *     responses:
 *       201:
 *         description: Conversation started successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 */
router.route('/conversations').get(getConversations).post(startConversation);

/**
 * @swagger
 * /api/chat/conversations/{conversationId}/messages:
 *   get:
 *     summary: Get all messages for a specific conversation
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *   post:
 *     summary: Send a message in a conversation
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendMessageInput'
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.route('/conversations/:conversationId/messages').get(getMessagesForConversation).post(sendMessage);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         family_id:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *           enum: [GROUP, DIRECT, CONFIDENTIAL_THREAD]
 *         created_by_user_id:
 *           type: string
 *           format: uuid
 *     StartConversationInput:
 *       type: object
 *       required:
 *         - family_id
 *         - type
 *         - participant_ids
 *       properties:
 *         family_id:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *           enum: [GROUP, DIRECT, CONFIDENTIAL_THREAD]
 *         participant_ids:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         conversation_id:
 *           type: string
 *           format: uuid
 *         sender_id:
 *           type: string
 *           format: uuid
 *         content_type:
 *           type: string
 *         content:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     SendMessageInput:
 *       type: object
 *       required:
 *         - content_type
 *         - content
 *       properties:
 *         content_type:
 *           type: string
 *         content:
 *           type: string
 */

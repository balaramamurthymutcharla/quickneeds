import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  addMedication,
  getMedications,
  addMedicationSchedule,
  logMedicationDose,
  getMedicationLogs,
} from '../controllers/health.controller.js';

const router = Router();

// All health routes are protected
router.use(verifyJWT);

/**
 * @swagger
 * /api/health/medications:
 *   post:
 *     summary: Add a new medication for a family member
 *     tags: [Health]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMedicationInput'
 *     responses:
 *       201:
 *         description: Medication added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *   get:
 *     summary: Get all medications for the family
 *     tags: [Health]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of medications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medication'
 */
router.route('/medications').post(addMedication).get(getMedications);

/**
 * @swagger
 * /api/health/medications/{medicationId}/schedule:
 *   post:
 *     summary: Add a new medication schedule
 *     tags: [Health]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: medicationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMedicationScheduleInput'
 *     responses:
 *       201:
 *         description: Medication schedule added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicationSchedule'
 */
router.route('/medications/:medicationId/schedule').post(addMedicationSchedule);

/**
 * @swagger
 * /api/health/schedules/{scheduleId}/log:
 *   post:
 *     summary: Log a medication dose
 *     tags: [Health]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogMedicationDoseInput'
 *     responses:
 *       201:
 *         description: Medication dose logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicationLog'
 */
router.route('/schedules/:scheduleId/log').post(logMedicationDose);

/**
 * @swagger
 * /api/health/schedules/{scheduleId}/logs:
 *   get:
 *     summary: Get all medication logs for a schedule
 *     tags: [Health]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A list of medication logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MedicationLog'
 */
router.route('/schedules/:scheduleId/logs').get(getMedicationLogs);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     AddMedicationInput:
 *       type: object
 *       required:
 *         - user_id
 *         - medicine_name
 *         - dosage
 *         - instructions
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *         medicine_name:
 *           type: string
 *         dosage:
 *           type: string
 *         instructions:
 *           type: string
 *     Medication:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         family_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         medicine_name:
 *           type: string
 *         dosage:
 *           type: string
 *         instructions:
 *           type: string
 *     AddMedicationScheduleInput:
 *       type: object
 *       required:
 *         - times_of_day
 *         - start_date
 *         - end_date
 *       properties:
 *         times_of_day:
 *           type: array
 *           items:
 *             type: string
 *             format: time
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *     MedicationSchedule:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         medication_id:
 *           type: string
 *           format: uuid
 *         times_of_day:
 *           type: array
 *           items:
 *             type: string
 *             format: time
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *     LogMedicationDoseInput:
 *       type: object
 *       required:
 *         - user_id
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *     MedicationLog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         medication_schedule_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         taken_at:
 *           type: string
 *           format: date-time
 */

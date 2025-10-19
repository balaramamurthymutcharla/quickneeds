import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Placeholder controllers - you would create these in family.controller.js
const createFamily = (req, res) => res.json({ message: 'Create family endpoint' });
const joinFamily = (req, res) => res.json({ message: 'Join family endpoint' });
const getFamilyDetails = (req, res) => res.json({ message: 'Get family details endpoint' });

// All family routes will be protected
router.use(verifyJWT);

router.post('/', createFamily);
router.post('/join', joinFamily);
router.get('/:familyId', getFamilyDetails);

export default router;


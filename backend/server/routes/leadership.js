import express from 'express';
import { getLeadership, createLeadership, updateLeadership, deleteLeadership } from '../controllers/leadershipController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getLeadership);
router.post('/', authenticateToken, requireRole(['admin']), createLeadership);
router.put('/:id', authenticateToken, requireRole(['admin']), updateLeadership);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteLeadership);

export default router;

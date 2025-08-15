import express from 'express';
import { getStaff, createStaff, updateStaff, deleteStaff } from '../controllers/staffController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getStaff);
router.post('/', authenticateToken, requireRole(['admin']), createStaff);
router.put('/:id', authenticateToken, requireRole(['admin']), updateStaff);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteStaff);

export default router;

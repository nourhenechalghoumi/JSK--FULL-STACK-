import express from 'express';
import { getMessages, createMessage, deleteMessage } from '../controllers/contactController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, requireRole(['admin', 'manager']), getMessages);
router.post('/', createMessage);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteMessage);

export default router;
